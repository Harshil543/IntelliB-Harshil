import React from 'react';
import CardWrapper from '@/components/CommonComponents/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createPropertyUser,
  updatePropertyUser
} from '@/services/property-user.service';
import PhoneInputField from '../CommonComponents/PhoneInput';

interface PropertyUserFormProps {
  initialValues?: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
    designation: string;
    status: string;
  };
}

export default function PropertyUserForm({
  initialValues
}: PropertyUserFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updatePropertyUser({
          payload: data?.value,
          id: initialValues.id
        });
      } else {
        return await createPropertyUser({ payload: data.value });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-user'] });
      router.push('/property-user/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      countryCode: '',
      mobileNumber: '',
      designation: '',
      status: 'Active'
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
          children={(field) => <TextInput label="First Name" field={field} />}
        />
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
          children={(field) => <TextInput label="Last Name" field={field} />}
        />
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
          children={(field) => (
            <TextInput type="email" label="Email" field={field} />
          )}
        />
        <form.Field
          name="mobileNumber"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'Mobile Number is required';

              return undefined;
            }
          }}
          children={(field) => (
            <PhoneInputField
              label="Mobile Number"
              field={{
                value: field.value,
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
            />
          )}
        />
        <form.Field
          name="designation"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Designation is required' : undefined
          }}
          children={(field) => <TextInput label="Designation" field={field} />}
        />
        <div className="col-span-full mt-10 flex space-x-4">
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
