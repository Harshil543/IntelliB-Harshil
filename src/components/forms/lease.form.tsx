import React, { useState } from 'react';

import { Button } from '../ui/button';
import { useForm } from '@tanstack/react-form';
import SelectInput from '../fields/SelectInput';
import TextInput from '../fields/TextInput';
import DatePickerInput from '../fields/DatePickerInput';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { getAllLeasableUnit } from '@/services/leasable-unit.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface LeasaFormProps {
  companyId?: number;
  isViewTenant?: boolean;
}

const LeasaForm = ({ companyId, isViewTenant }: LeasaFormProps) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['leasable-unit'],
    queryFn: getAllLeasableUnit,
    placeholderData: keepPreviousData
  });

  const leasableUnitData = data
    ? data.filter((unit: any) => unit.status === 'available')
    : [];
  const [selectedLeasableUnit, setSelectedLeasableUnit] = useState();

  const defaultValues = {
    startDate: '',
    endDate: '',
    rentAmount: '',
    leasableUnitId: ''
  };

  const form = useForm({
    defaultValues,
    onSubmit: async (value) => {
      console.log('Form submitted:', value);
      await mutation.mutateAsync({
        ...value,
        companyId,
        leasableUnitId: selectedLeasableUnit
      });
    }
  });

  const mutation = useMutation({
    mutationFn: async ({ companyId, leasableUnitId, ...data }: any) => {
      if (selectedLeasableUnit === undefined) {
        throw new Error('Leasable unit must be selected');
      }
      console.log('Creating lease with:', {
        companyId,
        leasableUnitId,
        payload: data
      });
      // Call your createLease function here
      // return await createLease({
      //   companyId,
      //   leasableUnitId,
      //   payload: data,
      // });
    },
    onSuccess: () => {
      toast.success(`Added successfully`);
    },
    onError: (error) => {
      console.error('API call error:', error);
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <form.Field
          name="startDate"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Start Date is required' : undefined
          }}
        >
          {(field) => (
            <DatePickerInput
              label="Start Date"
              field={field}
              placeholder="Select a date"
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="endDate"
          validators={{
            onChange: ({ value }) =>
              !value ? 'End Date is required' : undefined
          }}
        >
          {(field) => (
            <DatePickerInput
              label="End Date"
              field={field}
              placeholder="Select a date"
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="leasableUnitId"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Leasable Unit is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              label="Leasable Unit"
              field={field}
              disabled={isViewTenant}
              options={leasableUnitData.map((unit: any) => ({
                value: unit.id,
                label: unit.id
              }))}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value;
                setSelectedLeasableUnit(value);
                field.setValue(value);
              }}
            />
          )}
        </form.Field>
        <form.Field
          name="rentAmount"
          validators={{
            onChange: ({ value }) => {
              const parsedValue = Number(value);
              if (!value) return 'Rent Amount is required';
              if (isNaN(parsedValue)) return 'Rent Amount must be a number';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              label="Rent Amount"
              field={field}
              type="number"
              disabled={isViewTenant}
            />
          )}
        </form.Field>
      </div>
      <div className="col-span-full mt-10 flex justify-start space-x-4">
        <Button
          type="button"
          className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        {!isViewTenant && (
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        )}
      </div>
    </form>
  );
};

export default LeasaForm;
