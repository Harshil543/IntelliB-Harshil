import React from 'react';
import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PhoneInputField from '../fields/PhoneInput';
import {
  createPropertyCoAdmin,
  updatePropertyCoAdmin
} from '@/services/property-co-admin.service';
import SelectInput from '../fields/SelectInput';

interface PropertyCoAdminFormProps {
  initialValues?: {
    id?: number;
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
    designation: string;
    status: string;
  };
}

export default function PropertyCoAdminForm({
  initialValues
}: PropertyCoAdminFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isViewPropertyCoAdmin = pathname.includes('view-property-co-admin');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updatePropertyCoAdmin({
          payload: data?.value,
          id: initialValues.id
        });
      } else {
        return await createPropertyCoAdmin({ payload: data?.value });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-co-admin'] });
      router.push('/property-co-admin/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      mobileNumber: '',
      designation: ''
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
          name="salutation"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Salutation is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              disabled={isViewPropertyCoAdmin}
              label="Salutation"
              field={field}
              options={[
                { value: 'mr', label: 'mr' },
                { value: 'mrs', label: 'mrs' },
                { value: 'ms', label: 'ms' }
              ]}
            />
          )}
        </form.Field>
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'First name is required';
              if (value.length < 3)
                return 'First name must be at least 3 characters';
              if (value.length > 15)
                return 'First name must be at most 15 characters';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              disabled={isViewPropertyCoAdmin}
              label="First Name"
              field={field}
            />
          )}
        </form.Field>

        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Last name is required';
              if (value.length < 3)
                return 'Last name must be at least 3 characters';
              if (value.length > 15)
                return 'Last name must be at most 15 characters';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              disabled={isViewPropertyCoAdmin}
              label="Last Name"
              field={field}
            />
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Email is required';
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) return 'Invalid email address';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              disabled={isViewPropertyCoAdmin}
              type="email"
              label="Email"
              field={field}
            />
          )}
        </form.Field>

        <form.Field
          name="mobileNumber"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Mobile Number is required';
              return undefined;
            }
          }}
        >
          {(field) => (
            <PhoneInputField
              label="Mobile Number"
              field={{
                value: form.getFieldValue('mobileNumber'),
                countryCode: form.getFieldValue('countryCode'),
                setValue: (value: string) => {
                  form.setFieldValue('mobileNumber', value);
                },
                setCountryCode: (code: string) => {
                  form.setFieldValue('countryCode', code);
                },
                errorMessage: field.state.meta.errors.length
                  ? field.state.meta.errors.join(', ')
                  : undefined
              }}
              disabled={isViewPropertyCoAdmin}
            />
          )}
        </form.Field>

        <form.Field
          name="designation"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Designation is required' : undefined
          }}
        >
          {(field) => (
            <TextInput
              disabled={isViewPropertyCoAdmin}
              label="Designation"
              field={field}
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
          {!isViewPropertyCoAdmin && (
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
