'use client';

import { FormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import CardWrapper from '../layout/CardWrapper';
import Heading from '../fields/Heading';
import TextInput from '../fields/TextInput';
import { Button } from '../ui/button';
import {
  createBillingRate,
  updateBillingRate,
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
}

export const FlatRateBillingModel = ({
  initialValues
}: FlatRateFixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const type = 'FLAT_RATE';

  const { data } = useQuery({
    queryKey: ['billing-model', type],
    queryFn: () => getBillingRate(type)
  });

  // Determine default values based on fetched data
  const defaultValues: FlatRateBillingFormValue = {
    id: initialValues?.id,
    billingModeItems:
      data && data.billingModeItems && data.billingModeItems.length > 0
        ? data.billingModeItems
        : initialValues?.billingModeItems || [{ rate: 0 }]
  };

  const [isSubmitButtonVisible, setSubmitButtonVisible] = useState(true);

  const mutation = useMutation({
    mutationFn: async (data: FlatRateBillingFormValue) => {
      const updatedData = {
        ...data,
        category: 'FLAT_RATE'
      };
      if (data.id) {
        return await updateBillingRate(data.id, updatedData);
      } else {
        return await createBillingRate(updatedData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-model'] });
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);

      // Hide the submit button after creation
      if (!initialValues?.id) {
        setSubmitButtonVisible(false);
      }
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
      await mutation.mutateAsync(value);
    }
  });

  // Show button when editing
  useEffect(() => {
    if (initialValues?.id) {
      setSubmitButtonVisible(true);
    }
  }, [initialValues]);

  return (
    <CardWrapper>
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
                />
              )}
            </form.Field>
          </div>
          {isSubmitButtonVisible && (
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || mutation.isPending}
                >
                  {mutation.isPending ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            </form.Subscribe>
          )}
        </div>

        {/* <div className="col-span-full mt-10 flex justify-start space-x-4"> */}

        {/* </div> */}
      </form>
    </CardWrapper>
  );
};
