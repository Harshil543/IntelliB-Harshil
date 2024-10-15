'use client';
import React from 'react';
import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import SelectInput from '../fields/SelectInput';
import {
  createrMeterReading,
  updateMeterReading
} from '@/services/meter-reading.service';
import DatePickerInput from '../fields/DatePickerInput';
import { getAllMeter } from '@/services/meter.service';

interface MeterReading {
  id?: number;
  meterId: number;
  readingDate: Date;
  readingValue: number;
}

interface MeterReadingProps {
  initialValues?: MeterReading;
}

export default function MeterReadingForm({ initialValues }: MeterReadingProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isViewMeterReading = pathname.includes('view-meter-reading');

  const { data } = useQuery({
    queryKey: ['meter'],
    queryFn: () => getAllMeter()
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateMeterReading(initialValues?.id, data?.value);
      } else {
        return await createrMeterReading(data?.value);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meter-reading'] });
      router.push('/meter-reading/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      meterId: '',
      readingDate: '',
      readingValue: ''
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    }
  });

  return (
    <CardWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <form.Field
          name="meterId"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Meter Id is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              disabled={isViewMeterReading}
              label="Meter Number"
              field={field}
              options={
                data?.map((item: any) => ({
                  value: item?.id,
                  label: item?.meterNumber
                })) || []
              }
            />
          )}
        </form.Field>
        <form.Field
          name="readingDate"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Reading Date is required';
              return undefined;
            }
          }}
        >
          {(field) => (
            <DatePickerInput
              label="Reading Date"
              field={field}
              placeholder="Select a date"
              disabled={isViewMeterReading}
            />
          )}
        </form.Field>
        <form.Field
          name="readingValue"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Reading Value is required' : undefined
          }}
        >
          {(field) => (
            <TextInput
              disabled={isViewMeterReading}
              label="Reading Value"
              field={field}
              type="number"
            />
          )}
        </form.Field>

        <div className="col-span-full mt-10 flex space-x-4">
          <Button
            type="button"
            className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          {!isViewMeterReading && (
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

        {mutation.isError && (
          <div className="col-span-full text-red-500">
            {mutation.error instanceof Error
              ? mutation.error.message
              : 'An error occurred during submission.'}
          </div>
        )}
      </form>
    </CardWrapper>
  );
}
