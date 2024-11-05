'use client';
import { createMeter, updateMeter } from '@/services/meter.service';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import TextInput from '@components/fields/TextInput';
import DatePickerInput from '@components/fields/DatePickerInput';
import SelectInput from '@components/fields/SelectInput';
import { Button } from '@components/ui/button';
import { getAllLeasableUnit } from '@/services/leasable-unit.service';
import Loader from '@components/CommonComponents/Loader';
import { DialogHeader, DialogTitle } from '../ui/dialog';
import { getBillingConfiguration } from '@/services/billing-configuration.service';

interface MeterFormValues {
  id?: number;
  meterType: string;
  meterNumber: string;
  installationDate: Date | null;
  leasableUnitId: number | null;
  status: string;
}

interface MeterFormProps {
  initialValues?: MeterFormValues;
  closeButton?: React.ReactNode;
  leasableUnitId: number | null;
  onClose: Function;
}
export default function MeterForm({
  initialValues,
  closeButton,
  leasableUnitId,
  onClose
}: MeterFormProps) {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isViewLeasableUnit = pathname.includes('view-leasable-unit');

  const { isLoading } = useQuery({
    queryKey: ['meter'],
    queryFn: getAllLeasableUnit
  });

  const { data } = useQuery({
    queryKey: ['billingConfiguration'],
    queryFn: getBillingConfiguration
  });

  const meterTypeOptions =
    data?.map((item: any) => ({
      value: item.meterType,
      label: `${item.meterType.split('_').join(' ')}`
    })) || [];

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateMeter(initialValues.id, data?.value);
      } else {
        if (leasableUnitId === null) {
          throw new Error('Leasable Unit ID is required.');
        }
        return await createMeter({
          payload: data?.value,
          id: leasableUnitId
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meter'] });
      onClose();
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<MeterFormValues>({
    defaultValues: initialValues,
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
    }
  });

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
      <>
        <DialogHeader>
          <DialogTitle>
            {' '}
            {initialValues?.id ? `Update Meter` : `Register Meter`}
          </DialogTitle>
        </DialogHeader>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
          <form.Field
            name="meterType"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Meter Type is required' : undefined
            }}
          >
            {(field) => (
              <SelectInput
                label="Meter Type"
                field={field}
                options={meterTypeOptions}
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
          <form.Field
            name="meterNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Meter Number is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                label="Meter Number"
                field={field}
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
          <form.Field
            name="installationDate"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Installation Date is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <DatePickerInput
                label="Installation Date"
                field={field}
                placeholder="Select a date"
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
          {/* <form.Field
            name="leasableUnitId"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Leasable Unit is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <SelectInput
                label="Leasable Unit"
                field={field}
                options={
                  // isLoading
                  //   ? [{ value: '', label: 'Loading...' }]
                  //   : leasableUnits?.map((unit: any) => ({
                  //       value: unit.id,
                  //       label: unit.name
                  //     })) || []
                  []
                }
                disabled={isLoading || isViewLeasableUnit}
              />
            )}
          </form.Field> */}
          <form.Field
            name="status"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Status is required' : undefined
            }}
          >
            {(field) => (
              <SelectInput
                label="Status"
                field={field}
                options={[
                  { value: 'active', label: 'active' },
                  { value: 'inactive', label: 'inactive' },
                  { value: 'maintenance', label: 'maintenance' }
                ]}
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
        </div>
        <div className="col-span-full mt-10 flex justify-start space-x-4">
          {closeButton}

          {!isViewLeasableUnit && (
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
      </>
    </form>
  );
}
