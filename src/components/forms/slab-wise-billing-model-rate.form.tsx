'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CardWrapper from '../layout/CardWrapper';
import Heading from '../fields/Heading';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import {
  createBillingRate,
  getBillingRate
} from '@/services/billing-model.service';

interface SlabWiseRateBillingFormValue {
  id?: number;
  billingModeItems: {
    startSlab: number;
    endSlab: number;
    rate: number;
    disabled: boolean;
  }[];
}

interface SlabWiseRateFixedBillingFormProps {
  initialValues?: SlabWiseRateBillingFormValue;
}

export const SlabWiseRateBillingModel = ({
  initialValues
}: SlabWiseRateFixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const type = 'SLAB_WISE_RATE';
  const { data } = useQuery({
    queryKey: ['billing-model', type],
    queryFn: () => getBillingRate(type)
  });

  const [slabs, setSlabs] = useState<
    SlabWiseRateBillingFormValue['billingModeItems']
  >([{ startSlab: 0, endSlab: 0, rate: 0, disabled: false }]);

  useEffect(() => {
    if (data?.billingModeItems) {
      setSlabs(
        data.billingModeItems.map((item: any) => ({
          startSlab: item.startSlab,
          endSlab: item.endSlab,
          rate: item.rate,
          disabled: true
        }))
      );
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (data: SlabWiseRateBillingFormValue) => {
      return await createBillingRate({ ...data, category: 'SLAB_WISE_RATE' });
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

  const handleAddSlab = () => {
    setSlabs((prevSlabs) => [
      ...prevSlabs,
      {
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

  const handleRemoveSlab = (index: number) => {
    setSlabs((prevSlabs) => {
      const updatedSlabs = [...prevSlabs];
      updatedSlabs.splice(index, 1);
      return updatedSlabs.length
        ? updatedSlabs
        : [{ startSlab: 0, endSlab: 0, rate: 0, disabled: true }];
    });
  };

  return (
    <CardWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutateAsync({ billingModeItems: slabs });
        }}
      >
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
                      onChange={(e) => {
                        const newRate =
                          e.target.value === ''
                            ? 0
                            : parseFloat(e.target.value);
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
                        onClick={() => handleRemoveSlab(index)}
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

        <div className="col-span-full mt-10 flex justify-start space-x-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
          <Button type="button" onClick={handleAddSlab}>
            Add More
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
