'use client';
import { createMeter, updateMeter } from '@/services/meter.service';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import CardWrapper from '@components/layout/CardWrapper';
import Heading from '@components/fields/Heading';
import TextInput from '@components/fields/TextInput';
import DatePickerInput from '@components/fields/DatePickerInput';
import SelectInput from '@components/fields/SelectInput';
import { Button } from '@components/ui/button';
import { getAllLeasableUnit } from '@/services/leasable-unit.service';
import Loader from '@components/CommonComponents/Loader';

interface MeterFormValues {
  id?: number;
  meterType: string;
  meterNumber: string;
  installationDate: Date | null;
  status: string;
  leasableUnitId: number | string;
}

interface MeterFormProps {
  initialValues?: MeterFormValues;
}

export default function MeterForm({ initialValues }: MeterFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isViewMeter = pathname.includes('view-meter');

  const { data: leasableUnits, isLoading } = useQuery({
    queryKey: ['leasable-unit'],
    queryFn: getAllLeasableUnit
  });

  const mutation = useMutation({
    mutationFn: async (data: MeterFormValues) => {
      if (initialValues?.id) {
        return await updateMeter(initialValues.id, data);
      } else {
        return await createMeter(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meter'] });
      router.push('/meter/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<MeterFormValues>({
    defaultValues: initialValues || {
      meterType: '',
      meterNumber: '',
      installationDate: null,
      status: 'Active',
      leasableUnitId: '' as unknown as number
    },
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
      <CardWrapper>
        <Heading>Meter Data</Heading>

        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="meterType"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Meter Type is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                label="Meter Type"
                field={field}
                disabled={isViewMeter}
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
                disabled={isViewMeter}
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
                disabled={isViewMeter}
              />
            )}
          </form.Field>
          <form.Field
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
                  isLoading
                    ? [{ value: '', label: 'Loading...' }]
                    : leasableUnits?.map((unit: any) => ({
                        value: unit.id,
                        label: unit.name
                      })) || []
                }
                disabled={isLoading || isViewMeter}
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

          {!isViewMeter && (
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
      </CardWrapper>
    </form>
  );
}
