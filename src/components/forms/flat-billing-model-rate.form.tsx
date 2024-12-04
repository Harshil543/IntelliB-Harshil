'use client';

import { FormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Heading from '../fields/Heading';
import TextInput from '../fields/TextInput';
import { Button } from '../ui/button';
import {
  createBillingRate,
  getBillingRate
} from '@/services/billing-model.service';

interface FlatRateBillingFormValue {
  id?: number;
  billingModeItems: {
    rate: number;
  }[];
}

interface FlatRateFixedBillingFormProps {
  initialValues?: FlatRateBillingFormValue;
  meterType: string;
}

export const FlatRateBillingModel = ({
  initialValues,
  meterType
}: FlatRateFixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const type = 'FLAT_RATE';

  const { data } = useQuery({
    queryKey: ['billing-model', meterType, type],
    queryFn: () => getBillingRate(meterType, type)
  });

  // Determine default values based on fetched data
  const defaultValues: FlatRateBillingFormValue = {
    id: initialValues?.id,
    billingModeItems:
      data && data.billingModeItems && data.billingModeItems.length > 0
        ? data.billingModeItems
        : initialValues?.billingModeItems || [{ rate: 0 }]
  };

  const mutation = useMutation({
    mutationFn: async (data: FlatRateBillingFormValue) => {
      const updatedData = {
        ...data,
        meterType: meterType,
        category: 'FLAT_RATE'
      };
      if (data.id) {
        // return await updateBillingRate(data.id, updatedData);
      } else {
        return await createBillingRate(meterType, updatedData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-model'] });
      toast.success(`${data.id ? 'Updated' : 'Added'} successfully`);
      router.push('/billing-model/');
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<FlatRateBillingFormValue>({
    defaultValues,
    onSubmit: async ({
      value
    }: {
      value: FlatRateBillingFormValue;
      formApi: FormApi<FlatRateBillingFormValue, undefined>;
    }) => {
      if (value.billingModeItems[0].rate < 0) {
        toast.error('Please enter a valid positive number');
      } else {
        await mutation.mutateAsync(value);
      }
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="flex items-center justify-between gap-3 align-middle">
        <div className="flex items-center justify-center gap-5 align-middle">
          <Heading className="mt-2 text-lg">Flat Rate</Heading>

          <form.Field name={`billingModeItems[0].rate`}>
            {(field) => (
              <TextInput
                label=""
                placeholder="0.00"
                type="number"
                field={field}
                onChange={(value: any) => {
                  const isPositiveInteger = /^\d+$/.test(value);
                  if (!isPositiveInteger)
                    toast.error('Please enter a valid positive number');
                }}
              />
            )}
          </form.Field>
        </div>

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
  );
};
