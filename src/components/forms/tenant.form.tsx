// components/TenantForm.tsx
import React from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Heading from '../CommonComponents/Heading';
import SelectInput from '../CommonComponents/SelectInput';
import DatePickerInput from '../CommonComponents/DatePickerInput';
import { createTenant, updateTenant } from '@/services/tenant.service';

interface TenantFormProps {
  initialValues?: {
    id?: number;
    companyName: string;
    gstNumber: string;
    cinNumber: string;
    address: string;
    firstName: string;
    lastName: string;
    designation: string;
    mobileNumber: string;
    email: string;
    leasedUnit: string;
    leasedStartDate: string;
    leasedEndDate: string;
    bilingMethod: string;
    bilingType: string;
    bilingCycle: string;
    limit: string;
  };
}

export default function TenantForm({ initialValues }: TenantFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isViewTenant = pathname.includes('view-tenant');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateTenant({
          payload: data?.value,
          id: initialValues.id
        });
      } else {
        return await createTenant({ payload: data.value });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant'] });
      router.push('/tenants/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      companyName: '',
      gstNumber: '',
      cinNumber: '',
      address: '',
      firstName: '',
      lastName: '',
      designation: '',
      mobileNumber: '',
      email: '',
      leasedUnit: '',
      leasedStartDate: '',
      leasedEndDate: '',
      bilingMethod: '',
      bilingType: '',
      bilingCycle: '',
      limit: '',
      status: 'Active'
    },
    onSubmit: async (values) => {
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
        <Heading>Tenant Data</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="companyName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Company name is required';
                if (value.length < 3)
                  return 'Company name must be at least 3 characters';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                label="Company Name"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />

          <form.Field
            name="gstNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'GST Number is required';
                const gstRegex =
                  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
                if (!gstRegex.test(value))
                  return 'Invalid GST Number (should be 15 characters long)';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                label="GST Number"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />

          <form.Field
            name="cinNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'CIN Number is required';
                const cinRegex =
                  /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
                if (!cinRegex.test(value))
                  return 'Invalid CIN Number (should be 21 characters long and in the correct format)';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                type="text"
                label="CIN Number"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />
        </div>
        <form.Field
          name="address"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Address is required' : undefined
          }}
          children={(field) => (
            <TextInput label="Address" field={field} disabled={isViewTenant} />
          )}
        />
      </CardWrapper>

      <CardWrapper>
        <Heading>Tenant Data</Heading>

        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'First Name is required';
                if (value.length < 3)
                  return 'First Name must be at least 3 characters';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                label="First Name"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="lastName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Last Name is required';
                if (value.length < 3)
                  return 'Last Name must be at least 3 characters';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                label="Last Name"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />

          <form.Field
            name="designation"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Designation is required';
                if (value.length < 3)
                  return 'Designation must be at least 3 characters';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                type="text"
                label="Designation"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="mobileNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mobile Number is required';
                const mobileNumberRegex = /^[0-9]{10}$/;
                if (!mobileNumberRegex.test(value))
                  return 'Mobile Number must be a 10-digit number';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput
                label="Mobile Number"
                field={field}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Invalid email format';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput label="Email" field={field} disabled={isViewTenant} />
            )}
          />
        </div>
      </CardWrapper>

      <CardWrapper>
        <Heading>Leased Unit</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="leasedUnit"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Leased Unit is required' : undefined
            }}
            children={(field) => (
              <SelectInput
                label="Leased Unit"
                field={field}
                options={[
                  { value: '567', label: '567' },
                  { value: '679', label: '679' },
                  { value: '567', label: '567' }
                ]}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="leasedStartDate"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Leased start date is required' : undefined
            }}
            children={(field) => (
              <DatePickerInput
                label="Start Date"
                field={field}
                placeholder="Select a date"
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="leasedEndDate"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Leased end date is required' : undefined
            }}
            children={(field) => (
              <DatePickerInput
                label="End Date"
                field={field}
                placeholder="Select a date"
                disabled={isViewTenant}
              />
            )}
          />
        </div>
      </CardWrapper>

      <CardWrapper>
        <Heading>Billing Data</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="bilingMethod"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Biling Method is required' : undefined
            }}
            children={(field) => (
              <SelectInput
                label="Biling Method"
                field={field}
                options={[
                  { value: '567', label: '567' },
                  { value: '679', label: '679' },
                  { value: '567', label: '567' }
                ]}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="bilingType"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Biling Type is required' : undefined
            }}
            children={(field) => (
              <SelectInput
                label="Biling Type"
                field={field}
                options={[
                  { value: '567', label: '567' },
                  { value: '679', label: '679' },
                  { value: '567', label: '567' }
                ]}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="bilingCycle"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Biling Cycle is required' : undefined
            }}
            children={(field) => (
              <SelectInput
                label="Biling Cycle"
                field={field}
                options={[
                  { value: '567', label: '567' },
                  { value: '679', label: '679' },
                  { value: '567', label: '567' }
                ]}
                disabled={isViewTenant}
              />
            )}
          />
          <form.Field
            name="limit"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Limit is required' : undefined
            }}
            children={(field) => (
              <TextInput label="Limit" field={field} disabled={isViewTenant} />
            )}
          />
        </div>
      </CardWrapper>

      {!isViewTenant && (
        <div className="col-span-full mt-10 flex justify-end space-x-4">
          <Button
            type="button"
            className="text-dark w-fit bg-secondary hover:bg-opacity-80 hover:text-background"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          />
        </div>
      )}

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
