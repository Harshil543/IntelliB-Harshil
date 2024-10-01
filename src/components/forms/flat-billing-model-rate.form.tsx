'use client';

import { FormApi, useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import CardWrapper from '../layout/CardWrapper';
import Heading from '../fields/Heading';
import TextInput from '../fields/TextInput';
import { Button } from '../ui/button';

import { useState } from 'react';
import {
  createBillingRate
  // getBillingRate
} from '@/services/billing-model.service';

interface FlatRateBillingFormValue {
  id?: number;
  rate: number;
}

interface FlatRateFixedBillingFormProps {
  initialValues?: FlatRateBillingFormValue;
}

// Slab Wise Billing Model

interface FlatRateBillingFormValue {
  billingModeItems: {
    rate: number;
  }[];
}

export const FlatRateBillingModel = ({
  initialValues
}: FlatRateFixedBillingFormProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  // const type = 'FLAT_RATE';
  // const { data } = useQuery({
  //   queryKey: ['billing-model', type],
  //   queryFn: () => getBillingRate(type)
  // });

  // Initialize slab state with one slab
  const [slabs, setSlabs] = useState([
    {
      rate: 0,
      disabled: false
    }
  ]);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const updatedData = {
        ...data,
        category: 'FLAT_RATE'
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

  const form = useForm<FlatRateBillingFormValue>({
    defaultValues: initialValues,
    onSubmit: async ({
      value
    }: {
      value: FlatRateBillingFormValue;
      formApi: FormApi<FlatRateBillingFormValue, undefined>;
    }) => {
      await mutation.mutateAsync(value);
    }
  });

  const handleAddSlab = () => {
    setSlabs((prevSlabs) => [
      ...prevSlabs.map((slab) => ({ ...slab, disabled: true })),
      {
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
        <div className="mb-7 flex items-center justify-start align-middle">
          <Heading className="text-lg">Flat Rate</Heading>
          {slabs.map((slab, index) => (
            <tr key={index}>
              <td className="px-20">
                <form.Field name={`billingModeItems[${index}].rate`}>
                  {(field) => (
                    <TextInput
                      label=""
                      placeholder="0.00"
                      type="number"
                      field={field}
                      disabled={slab.disabled}
                    />
                  )}
                </form.Field>
              </td>
            </tr>
          ))}
          <Button type="button" onClick={handleAddSlab}>
            Add More
          </Button>
        </div>

        {/* {data?.billingModeItems?.map((item: any) => {
          return (
            <tr key={item?.id}>
              <td className="h-10 text-center">{item?.rate}</td>
            </tr>
          );
        })} */}

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
