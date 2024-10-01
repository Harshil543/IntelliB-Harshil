'use client';

import { FormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CardWrapper from '../layout/CardWrapper';
import Heading from '../fields/Heading';
import TextInput from '../fields/TextInput';
import { Button } from '../ui/button';
import { useState } from 'react';
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

// Slab Wise Billing Model

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

  // Initialize slab state with one slab
  const [slabs, setSlabs] = useState([
    {
      startSlab: 0,
      endSlab: 0,
      rate: 0,
      disabled: false
    }
  ]);

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
    setSlabs((prevSlabs) => [
      ...prevSlabs.map((slab) => ({ ...slab, disabled: true })),
      {
        startSlab: 0,
        endSlab: 0,
        rate: 0,
        disabled: false
      }
    ]);
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

          <Button type="button" onClick={handleAddSlab}>
            Add Slab
          </Button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="my-10 h-10 rounded-lg bg-secondary">
              <th>Slab Start Unit</th>
              <th>Slab End Unit</th>
              <th>Rate</th>
            </tr>
          </thead>
          <tbody>
            {data?.billingModeItems?.map((item: any) => {
              return (
                <tr key={item?.id}>
                  <td className="h-10 text-center">
                    <div className="h-10 rounded-lg border-border">
                      {item?.startSlab}
                    </div>
                  </td>
                  <td className="h-10 text-center">{item?.endSlab}</td>
                  <td className="h-10 text-center">{item?.rate}</td>
                </tr>
              );
            })}
            {slabs.map((slab, index) => (
              <tr key={index}>
                <td className="px-20">
                  <form.Field name={`billingModeItems[${index}].startSlab`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="px-20">
                  <form.Field name={`billingModeItems[${index}].endSlab`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
                </td>
                <td className="px-20">
                  <form.Field name={`billingModeItems[${index}].rate`}>
                    {(field) => (
                      <TextInput
                        label=""
                        type="number"
                        field={field}
                        disabled={slab.disabled}
                      />
                    )}
                  </form.Field>
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
        </div>
      </form>
    </CardWrapper>
  );
};
