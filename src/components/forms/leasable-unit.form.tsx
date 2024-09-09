// components/LeasableUnitForm.tsx
import React from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Heading from '../fields/Heading';

import {
  createLeasableUnit,
  updateLeasableUnit
} from '@/services/leasable-unit.service';
import MultiSelectInput from '../fields/MultiSelectInput';
import SelectInput from '../fields/SelectInput';

interface LeasableUnitFormValues {
  id?: number;
  name: string;
  floorAndWing: string;
  smartMeterId: string[];
  status: string;
}

interface LeasableUnitFormProps {
  initialValues?: LeasableUnitFormValues;
}

export default function LeasableUnitForm({
  initialValues
}: LeasableUnitFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isViewLeasableUnit = pathname.includes('view-leasable-unit');

  const mutation = useMutation({
    mutationFn: async (data: LeasableUnitFormValues) => {
      if (initialValues?.id) {
        return await updateLeasableUnit(initialValues.id, data);
      } else {
        return await createLeasableUnit(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leasable-unit'] });
      router.push('/leasable-unit/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<LeasableUnitFormValues>({
    defaultValues: initialValues || {
      name: '',
      floorAndWing: '',
      smartMeterId: [],
      status: 'Active'
    },
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <CardWrapper>
        <Heading>Leasable Unit Data</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Name is required';
                if (value.length < 3)
                  return 'Leasable Unit name must be at least 3 characters';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                label="Name"
                field={field}
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
          <form.Field
            name="floorAndWing"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Floor/Wing is required';
                if (value.length < 3)
                  return 'Floor And Wing must be at least 3 characters';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                label="Floor/Wing"
                field={field}
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
          <form.Field
            name="smartMeterId"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Assigned Smart Meter is required' : undefined
            }}
          >
            {(field) => (
              <MultiSelectInput
                disabled={isViewLeasableUnit}
                label="Assigned Smart Meter"
                field={field}
                options={[
                  { value: '567', label: '567' },
                  { value: '679', label: '679' },
                  { value: '789', label: '789' }
                ]}
                placeholder="Select Smart Meter"
              />
            )}
          </form.Field>
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
                  { value: 'Active', label: 'List' },
                  { value: 'Inactive', label: 'Delist' }
                ]}
                disabled={isViewLeasableUnit}
              />
            )}
          </form.Field>
        </div>
      </CardWrapper>

      <div className="col-span-full mt-10 flex justify-end space-x-4">
        <Button
          type="button"
          className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
          onClick={() => router.back()}
        >
          Cancel
        </Button>

        {!isViewLeasableUnit && (
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
