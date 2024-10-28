'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CardWrapper from '@/components/layout/CardWrapper';
import SelectInput from '@/components/fields/SelectInput';
import { MeterType, Category } from '@/constants/enums.constants';
import { createBillingConfiguration } from '@/services/billing-configuration.service';
import toast from 'react-hot-toast';

interface BillingConfigurationValues {
  configurations: {
    meterType: string;
    category: string;
  }[];
}

interface BillingConfigurationProps {
  initialValues?: BillingConfigurationValues;
}

export default function BillingConfiguration({
  initialValues
}: BillingConfigurationProps) {
  const queryClient = useQueryClient();
  const [configurations, setConfigurations] = useState(
    initialValues?.configurations || [{ meterType: '', category: '' }]
  );

  const meterTypeOptions = [
    { value: MeterType.ELECTRICITY, label: MeterType.ELECTRICITY },
    {
      value: MeterType.DIESEL_GENERATOR,
      label: MeterType.DIESEL_GENERATOR.split('_').join(' ')
    },
    { value: MeterType.WATER, label: MeterType.WATER },
    { value: MeterType.GAS, label: MeterType.GAS }
  ];

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

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await createBillingConfiguration({ data: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing-configuration'] });
      toast.success(`Added successfully`);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<BillingConfigurationValues>({
    defaultValues: { configurations },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values.value.configurations);
    }
  });

  const handleAddConfiguration = () => {
    setConfigurations([...configurations, { meterType: '', category: '' }]);
  };

  const handleRemoveConfiguration = (index: number) => {
    const newConfigurations = configurations.filter((_, i) => i !== index);
    setConfigurations(newConfigurations);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <CardWrapper>
        <div className="my-5 w-full space-y-4">
          {configurations.map((config, index) => (
            <div
              key={index}
              className="grid w-full grid-cols-3 items-end gap-4"
            >
              <form.Field name={`configurations[${index}].meterType`}>
                {(field) => (
                  <SelectInput
                    label="Meter Type"
                    field={field}
                    options={meterTypeOptions}
                  />
                )}
              </form.Field>
              <form.Field name={`configurations[${index}].category`}>
                {(field) => (
                  <SelectInput
                    label="Category"
                    field={field}
                    options={categoryOptions}
                  />
                )}
              </form.Field>
              <Button
                type="button"
                className="w-fit"
                onClick={() => handleRemoveConfiguration(index)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button type="button" onClick={handleAddConfiguration}>
          Add More
        </Button>
      </CardWrapper>

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

      {mutation.isError && (
        <div className="col-span-full text-red-500">
          {mutation.error instanceof Error
            ? mutation.error.message
            : 'An error occurred during submission.'}
        </div>
      )}
    </form>
  );
}
