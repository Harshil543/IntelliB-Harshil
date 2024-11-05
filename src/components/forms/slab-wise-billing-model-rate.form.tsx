'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Heading from '../fields/Heading';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import {
  createBillingRate,
  getBillingRate,
  deleteBillingRate
} from '@/services/billing-model.service';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface SlabWiseRateBillingFormValue {
  id?: number;
  billingModeItems: {
    id: any;
    startSlab: number;
    endSlab: number;
    rate: number;
    disabled: boolean;
  }[];
}

interface SlabWiseRateFixedBillingFormProps {
  initialValues?: SlabWiseRateBillingFormValue;
  meterType: string;
}

export const SlabWiseRateBillingModel = ({
  initialValues,
  meterType
}: SlabWiseRateFixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const type = 'SLAB_WISE_RATE';
  const { data } = useQuery({
    queryKey: ['billing-model', meterType, type],
    queryFn: () => getBillingRate(meterType, type)
  });

  const [slabs, setSlabs] = useState<
    SlabWiseRateBillingFormValue['billingModeItems']
  >([{ id: null, startSlab: 0, endSlab: 0, rate: 0, disabled: false }]);

  const [errors, setErrors] = useState<string[]>([]); // State to hold error messages
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [slabToDelete, setSlabToDelete] = useState<number | null>(null); // State to hold the slab id to delete

  useEffect(() => {
    if (data?.billingModeItems) {
      setSlabs(
        data.billingModeItems.map((item: any) => ({
          id: item.id,
          startSlab: item.startSlab,
          endSlab: item.endSlab,
          rate: item.rate,
          disabled: true // Existing slabs should be marked as disabled
        }))
      );
    }
  }, [data]);

  const addmutation = useMutation({
    mutationFn: async (data: SlabWiseRateBillingFormValue) => {
      const payload = {
        ...data,
        meterType: meterType,
        category: 'SLAB_WISE_RATE'
      };

      return await createBillingRate(meterType, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-model'] });
      router.push('/billing-model/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const removeMutation = useMutation({
    mutationFn: async (id: number) => {
      return await deleteBillingRate(meterType, type, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-model'] });
      toast.success('Slab removed successfully');
      setSlabToDelete(null);
      setShowModal(false);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const handleAddSlab = () => {
    setSlabs((prevSlabs) => [
      ...prevSlabs,
      {
        id: null,
        startSlab:
          prevSlabs.length > 0
            ? prevSlabs[prevSlabs.length - 1].endSlab + 1
            : 0,
        endSlab: 0,
        rate: 0,
        disabled: false
      }
    ]);
  };

  const handleRemoveSlab = (index: number, id: number | null) => {
    if (id) {
      setSlabToDelete(id); // Set the slab to delete and show modal
      setShowModal(true); // Show the confirmation modal
    } else {
      setSlabs((prevSlabs) => {
        const updatedSlabs = [...prevSlabs];
        updatedSlabs.splice(index, 1);
        return updatedSlabs.length
          ? updatedSlabs
          : [{ id: null, startSlab: 0, endSlab: 0, rate: 0, disabled: true }];
      });
    }
  };

  const validateSlabs = () => {
    const newErrors: string[] = [];

    slabs.forEach((slab, index) => {
      if (slab.endSlab <= slab.startSlab && slab.endSlab !== 0) {
        newErrors.push(
          `End Slab must be greater than Start Slab at index ${index + 1}`
        );
      }
      if (slab.endSlab === 0) {
        newErrors.push(`End Slab is required at index ${index + 1}`);
      }
      if (slab.rate === 0) {
        newErrors.push(`Rate must be required at index ${index + 1}`);
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSlabs()) {
      const newSlabs = slabs.filter((slab) => !slab.disabled);
      addmutation.mutateAsync({ billingModeItems: newSlabs });
    }
  };

  const isAddButtonDisabled = slabs.some((slab) => slab.endSlab === 0);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-7 flex justify-between">
        <Heading className="text-lg">Slab-Wise Rate</Heading>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="my-10 h-10 rounded-lg bg-secondary">
              <th>Slab</th>
              <th>Slab Start Unit</th>
              <th>Slab End Unit</th>
              <th>Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slabs.map((slab, index) => (
              <tr key={index}>
                <td className="mx-3 sm:px-2 lg:px-10">{index + 1}</td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  <input
                    type="number"
                    value={slab.startSlab}
                    disabled
                    placeholder="0"
                    className="m-1 h-10 rounded-lg border border-border p-2 text-sm"
                  />
                </td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  <input
                    type="number"
                    placeholder="0"
                    disabled={slab.disabled}
                    value={slab.endSlab === 0 ? '' : slab.endSlab}
                    onChange={(e) => {
                      const newEndSlab =
                        e.target.value === '' ? 0 : parseInt(e.target.value);
                      setSlabs((prevSlabs) => {
                        const updatedSlabs = [...prevSlabs];
                        updatedSlabs[index].endSlab = newEndSlab;
                        return updatedSlabs;
                      });
                    }}
                    className="m-1 h-10 rounded-lg border border-border p-2 text-sm"
                  />
                </td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  <input
                    type="number"
                    placeholder="0"
                    disabled={slab.disabled}
                    value={slab.rate === 0 ? '' : slab.rate}
                    required
                    onChange={(e) => {
                      const newRate =
                        e.target.value === '' ? 0 : parseFloat(e.target.value);
                      setSlabs((prevSlabs) => {
                        const updatedSlabs = [...prevSlabs];
                        updatedSlabs[index].rate = newRate;
                        return updatedSlabs;
                      });
                    }}
                    className="m-1 h-10 rounded-lg border border-border p-2 text-sm"
                  />
                </td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  {slabs.length === index + 1 && (
                    <Button
                      type="button"
                      onClick={() => handleRemoveSlab(index, slab.id)}
                    >
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {errors.length > 0 && (
        <div className="text-red-500">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}

      <div className="col-span-full mt-10 flex justify-start space-x-4">
        <Button type="submit" disabled={addmutation.isPending}>
          {addmutation.isPending ? 'Submitting...' : 'Submit'}
        </Button>
        <Button
          type="button"
          onClick={handleAddSlab}
          disabled={isAddButtonDisabled}
        >
          Add More
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        //   <div className="rounded-lg bg-white p-5 shadow-lg">
        //     <h3 className="mb-4 text-xl font-semibold">
        //       Are you sure you want to delete this slab?
        //     </h3>
        //     <div className="flex justify-end space-x-4">
        //       <Button
        //         onClick={() => {
        //           removeMutation.mutate(slabToDelete!);
        //         }}
        //       >
        //         Yes
        //       </Button>
        //       <Button onClick={() => setShowModal(false)} variant="outline">
        //         No
        //       </Button>
        //     </div>
        //   </div>
        // </div>
        <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
          <DialogContent className="h-52 sm:max-w-md">
            <DialogHeader className="pt-10">
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete slab?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <Button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
              >
                No
              </Button>
              <Button
                type="button"
                onClick={() => {
                  removeMutation.mutate(slabToDelete!);
                }}
              >
                Yes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
};

export default SlabWiseRateBillingModel;
