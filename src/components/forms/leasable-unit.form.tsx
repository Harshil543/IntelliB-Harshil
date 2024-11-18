// components/LeasableUnitForm.tsx
import React, { useEffect, useState } from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Heading from '../fields/Heading';
import {
  createLeasableUnit,
  updateLeasableUnit
} from '@/services/leasable-unit.service';

import SelectInput from '../fields/SelectInput';
import MeterList from '../CommonComponents/MeterList';
import { MeterFormModal } from '../CommonComponents/meter.modal';
import { getMeter } from '@/services/meter.service';

interface LeasableUnitFormValues {
  id?: number;
  unitNumber: string;
  // unitName: string;
  unitType: string;
  floor?: number;
  squareFootage?: number;
  status: string;
}

interface LeasableUnitFormProps {
  initialValues?: LeasableUnitFormValues;
}

export default function LeasableUnitForm({
  initialValues
}: LeasableUnitFormProps) {
  const [leasableUnitId, setLeasableUnitId] = useState<number | null>(null);
  const [isCreated, setIsCreated] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const lastSegment = pathname.split('/').filter(Boolean).pop();
  const id: number | null = lastSegment ? Number(lastSegment) : null;

  useEffect(() => {
    if (id !== null) {
      setLeasableUnitId(id);
    }
  }, [id]);

  const isViewLeasableUnit = pathname.includes('view-leasable-unit');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateLeasableUnit({
          payload: data?.value,
          id: initialValues?.id
        });
      } else {
        return await createLeasableUnit(data?.value);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['leasable-unit'] });
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
      setIsCreated(true);
      if (!initialValues?.id && setLeasableUnitId) {
        setLeasableUnitId(data.id);
      }
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<LeasableUnitFormValues>({
    defaultValues: initialValues,
    onSubmit: async (values: any) => {
      const payload = {
        ...values,
        floor: Number(values.floor)
      };
      await mutation.mutateAsync(payload);
    }
  });

  //meter
  const [isOpen, setIsOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { data: meterData, isError: isErrorMeter } = useQuery({
    queryKey: ['meter', page, searchQuery, limit, leasableUnitId],
    queryFn: () => {
      if (leasableUnitId !== null) {
        return getMeter(page, searchQuery, limit, leasableUnitId);
      }
      return Promise.resolve({ items: [] });
    },
    enabled: leasableUnitId !== null
  });

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };
  return (
    <>
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
              name="unitNumber"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Unit Number is required';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  label="Unit Number"
                  field={field}
                  disabled={isViewLeasableUnit}
                />
              )}
            </form.Field>
            <form.Field
              name="unitType"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Unit Type is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  label="Unit Type"
                  field={field}
                  options={[
                    { value: 'apartment', label: 'apartment' },
                    { value: 'office', label: 'office' },
                    { value: 'retail', label: 'retail' }
                  ]}
                  disabled={isViewLeasableUnit}
                />
              )}
            </form.Field>
            {/* <form.Field name="unitName">
              {(field) => (
                <TextInput
                  label=" Unit Name"
                  field={field}
                  disabled={isViewLeasableUnit}
                  required={false}
                />
              )}
            </form.Field> */}
            <form.Field
              name="floor"
              validators={{
                onChange: ({ value }) => {
                  const parsedValue = Number(value);
                  if (!value) return 'Floor is required';
                  if (isNaN(parsedValue)) return 'Floor must be a number';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  label="Floor/Wing"
                  field={field}
                  type="number"
                  disabled={isViewLeasableUnit}
                />
              )}
            </form.Field>

            <form.Field
              name="squareFootage"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Floor Area is required';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  label="Floor Area (Square Feet)"
                  field={field}
                  type="string"
                  disabled={isViewLeasableUnit}
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
                    { value: 'available', label: 'available' },
                    { value: 'leased', label: 'leased' },
                    { value: 'maintenance', label: 'maintenance' }
                  ]}
                  disabled={isViewLeasableUnit}
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

            {!isViewLeasableUnit && (
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || mutation.isPending || isCreated}
                  >
                    {mutation.isPending ? 'Submitting...' : 'Submit'}
                  </Button>
                )}
              </form.Subscribe>
            )}
          </div>
        </CardWrapper>
      </form>

      {leasableUnitId ? (
        <CardWrapper>
          <Heading>Meter Data</Heading>
          <MeterList
            data={
              meterData && meterData?.items && meterData?.items.length > 0
                ? meterData?.items
                : []
            }
            isError={isErrorMeter}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            handleSearch={handleSearch}
            addButton={
              <Button
                type="button"
                disabled={isViewLeasableUnit}
                onClick={() => setIsOpen(true)}
              >
                Add
              </Button>
            }
            handleLimitChange={handleLimitChange}
            limit={limit}
          />
        </CardWrapper>
      ) : null}
      {isOpen && (
        <MeterFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          leasableUnitId={leasableUnitId}
        />
      )}
    </>
  );
}
