'use client';

import { FormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CardWrapper from '../layout/CardWrapper';
import Heading from '../fields/Heading';
import TextInput from '../fields/TextInput';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import {
  createBillingRate,
  getBillingRate
} from '@/services/billing-model.service';

interface SlabWiseRateBillingFormValue {
  id?: number;
  rate: number;
  startSlab: number;
  endSlab: number;
}

interface SlabWiseRateFixedBillingFormProps {
  initialValues?: SlabWiseRateBillingFormValue;
}

interface SlabWiseRateBillingFormValue {
  billingModeItems: {
    startSlab: number;
    endSlab: number;
    rate: number;
  }[];
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

  const [slabs, setSlabs] = useState([
    {
      startSlab: 0,
      endSlab: 0,
      rate: 0,
      disabled: false
    }
  ]);

  useEffect(() => {
    if (data && data.billingModeItems) {
      setSlabs(
        data.billingModeItems.map((item: any) => ({
          startSlab: item?.startSlab,
          endSlab: item?.endSlab,
          rate: item?.rate,
          disabled: true
        }))
      );
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const updatedData = {
        ...data,
        category: 'SLAB_WISE_RATE'
      };

      return await createBillingRate(updatedData);
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

  const form = useForm<SlabWiseRateBillingFormValue>({
    defaultValues: initialValues,
    onSubmit: async ({
      value
    }: {
      value: SlabWiseRateBillingFormValue;
      formApi: FormApi<SlabWiseRateBillingFormValue, undefined>;
    }) => {
      await mutation.mutateAsync(value);
    }
  });

  const handleAddSlab = () => {
    setSlabs((prevSlabs) => {
      const lastSlab = prevSlabs[prevSlabs.length - 1];
      const newStartSlab = lastSlab.endSlab + 1;

      return [
        ...prevSlabs.map((slab) => ({ ...slab, disabled: true })),
        {
          startSlab: newStartSlab,
          endSlab: 0,
          rate: 0,
          disabled: false
        }
      ];
    });
  };

  const handleRemoveSlab = (index: number) => {
    setSlabs((prevSlabs) => {
      if (prevSlabs.length > 1) {
        return prevSlabs.filter((_, i) => i !== index);
      }
      return prevSlabs;
    });
  };

  return (
    <CardWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="mb-7 flex justify-between">
          <Heading className="text-lg">Slab-Wise Rate</Heading>
        </div>
        <table className="w-full">
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
                  <form.Field name={`billingModeItems[${index}].startSlab`}>
                    {(field) => (
                      <TextInput
                        label=""
                        placeholder="0"
                        type="number"
                        field={field}
                        disabled={true}
                        value={slab?.startSlab}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  <form.Field name={`billingModeItems[${index}].endSlab`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        placeholder="0"
                        value={slab?.endSlab}
                        field={field}
                        disabled={slab.disabled}
                        onChange={(value: string | number) => {
                          const newEndSlab =
                            typeof value === 'number'
                              ? value
                              : parseInt(value) || 0;
                          setSlabs((prevSlabs) => {
                            const updatedSlabs = [...prevSlabs];
                            updatedSlabs[index].endSlab = newEndSlab;
                            return updatedSlabs;
                          });
                        }}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  <form.Field name={`billingModeItems[${index}].rate`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        placeholder="0.00"
                        field={field}
                        value={slab?.rate}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="mx-3 sm:px-2 lg:px-10">
                  {slabs.length === index + 1 && !slab.disabled && (
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

        <div className="col-span-full mt-10 flex justify-start space-x-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
          <Button type="button" onClick={handleAddSlab}>
            Add More
          </Button>
        </div>
      </form>
    </CardWrapper>
  );
};
