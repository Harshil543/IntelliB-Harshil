'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useForm } from '@tanstack/react-form';
import SelectInput from '../fields/SelectInput';
import DatePickerInput from '../fields/DatePickerInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllLeasableUnit } from '@/services/leasable-unit.service';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createLease, updateLease, getLease } from '@/services/lease.service';
import Loader from '../CommonComponents/Loader';

interface LeasaFormProps {
  companyId: number;
  isViewTenant?: boolean;
}

const LeasaForm = ({ companyId, isViewTenant }: LeasaFormProps) => {
  const router = useRouter();

  // Query to get all leasable units
  const {
    data: leasableUnitsData,
    isLoading: isLoadingLeasableUnits,
    error: leasableUnitsError
  } = useQuery({
    queryKey: ['leasableUnits'],
    queryFn: getAllLeasableUnit,
    placeholderData: []
  });

  // Query to get lease data for the specific companyId
  const {
    data: leaseData,
    isLoading: isLoadingLeaseData,
    error: leaseError
  } = useQuery({
    queryKey: ['lease', companyId],
    queryFn: () => getLease(companyId),
    enabled: !!companyId
  });
  const [selectedLeasableUnit, setSelectedLeasableUnit] = useState(
    leaseData?.items[0]?.leasableUnitId || ''
  );

  const leasableUnitData = leasableUnitsData.filter(
    (unit: any) => unit.status === 'available'
  );

  const defaultValues = {
    startDate: leaseData?.items[0]?.startDate || '',
    endDate: leaseData?.items[0]?.endDate || '',
    // rentAmount: leaseData?.items[0]?.rentAmount || '',
    rentAmount: '0',
    leasableUnitId: leaseData?.items[0]?.leasableUnitId || ''
  };

  const form = useForm({
    defaultValues,
    onSubmit: async (value) => {
      if (leaseData?.items.length > 0) {
        // Call update API if leaseData exists
        await mutationUpdate.mutateAsync({
          ...value,
          companyId,
          leasableUnitId: selectedLeasableUnit,
          leaseId: leaseData.items[0].id // Assuming leaseData has an id field
        });
      } else {
        // Call create API if leaseData is empty
        await mutationCreate.mutateAsync({
          ...value,
          companyId,
          leasableUnitId: selectedLeasableUnit
        });
      }
    }
  });

  const mutationCreate = useMutation({
    mutationFn: async ({ companyId, leasableUnitId, ...data }: any) => {
      if (selectedLeasableUnit === undefined) {
        throw new Error('Leasable unit must be selected');
      }

      return await createLease({
        companyId,
        leasableUnitId,
        payload: data?.value
      });
    },
    onSuccess: () => {
      toast.success(`Lease created successfully`);
    },
    onError: (error) => {
      console.error('API call error:', error);
      toast.error(`Error creating lease: ${(error as Error).message}`);
    }
  });

  const mutationUpdate = useMutation({
    mutationFn: async ({ companyId, leaseId, ...data }: any) => {
      return await updateLease({
        companyId,
        leasableUnitId: leaseData?.items[0]?.leasableUnitId,
        leaseId,
        payload: data?.value
      });
    },
    onSuccess: () => {
      toast.success(`Lease updated successfully`);
    },
    onError: (error) => {
      toast.error(`Error updating lease: ${(error as Error).message}`);
    }
  });

  // Loading states
  if (isLoadingLeasableUnits || isLoadingLeaseData) return <Loader />;
  if (leasableUnitsError) {
    toast.error(
      `Error fetching leasable units: ${(leasableUnitsError as Error).message}`
    );
    return null;
  }
  if (leaseError) {
    toast.error(`Error fetching lease data: ${(leaseError as Error).message}`);
    return null;
  }

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
        {/* <form.Field
          name="rentAmount"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Rent Amount is required';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              label="Rent Amount"
              field={field}
              type="text"
              disabled={isViewTenant}
            />
          )}
        </form.Field> */}
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
              <Button
                type="submit"
                disabled={
                  !canSubmit ||
                  mutationCreate.isPending ||
                  mutationUpdate.isPending
                }
              >
                {mutationCreate.isPending || mutationUpdate.isPending
                  ? 'Submitting...'
                  : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        )}
      </div>
    </form>
  );
};

export default LeasaForm;
