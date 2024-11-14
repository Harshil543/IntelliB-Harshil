'use client';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import CardWrapper from '@/components/layout/CardWrapper';
import SelectInput from '@/components/fields/SelectInput';
import { Category } from '@/constants/enums.constants';
import {
  createBillingConfiguration,
  getBillingConfiguration
} from '@/services/billing-configuration.service';
import toast from 'react-hot-toast';
import Loader from '@/components/CommonComponents/Loader';

interface BillingConfigurationValues {
  data: {
    meterType: string;
    category: string;
  }[];
}

const BillingConfigurationForm = ({ BillingConfigurationValues }: any) => {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ['billing-configuration'],
    queryFn: () => getBillingConfiguration(),
    placeholderData: keepPreviousData
  });
  console.log('data', data);

  const [configurations, setConfigurations] = useState(
    BillingConfigurationValues || []
  );

  // Categories options
  const categoryOptions = [
    {
      value: Category.FLAT_RATE,
      label: Category.FLAT_RATE.split('_').join(' ')
    },
    {
      value: Category.SLAB_WISE_RATE,
      label: Category.SLAB_WISE_RATE.split('_').join(' ')
    }
  ];

  // Mutation to create/update billing configuration
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await createBillingConfiguration({ data: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-configuration'] });
      toast.success(`Updated successfully`);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  // Set up the form with initial values
  const form = useForm<BillingConfigurationValues>({
    defaultValues: { data: configurations },
    onSubmit: async (values) => {
      // We only need to send the category field in the payload
      const payload = values.value.data.map((item: any) => ({
        meterType: item.meterType,
        category: item.category
      }));
      await mutation.mutateAsync(payload);
    }
  });

  useEffect(() => {
    if (data) {
      setConfigurations(data);
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <CardWrapper>
        {configurations.map((item: any, i: number) => {
          // Filter category options based on meterType (optional, if you need to restrict category options)
          const availableCategories = categoryOptions;

          return (
            <div
              key={i}
              className="flex-wrap items-center justify-start gap-2 sm:flex sm:w-full md:w-full md:flex-wrap lg:w-[50%]"
            >
              <span className="mt-5 flex w-[30%] items-center justify-center align-middle text-sm capitalize">
                {item?.meterType.split('_').join(' ').toLowerCase()}
              </span>
              <div className="w-[60%]">
                <form.Field name={`data[${i}].category`}>
                  {(field) => (
                    <SelectInput
                      label=""
                      required={false}
                      field={field}
                      options={availableCategories}
                    />
                  )}
                </form.Field>
              </div>
            </div>
          );
        })}
        <div className="col-span-full mt-10 flex justify-start space-x-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Save Changes'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </CardWrapper>

      {mutation.isError && (
        <div className="col-span-full text-red-500">
          {mutation.error instanceof Error
            ? mutation.error.message
            : 'An error occurred during submission.'}
        </div>
      )}
    </form>
  );
};

export default BillingConfigurationForm;
