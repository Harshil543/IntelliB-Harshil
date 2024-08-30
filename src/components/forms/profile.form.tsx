'use client';
import React from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { useForm } from '@tanstack/react-form';
import TextInput from '../CommonComponents/TextInput';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUser } from '@/services/user.service';
import SelectInput from '../CommonComponents/SelectInput';

interface ProfileFormProps {
  initialValues?: {
    id?: number;
    salutation: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNumber: string;
  };
}

export default function ProfileForm({ initialValues }: ProfileFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateUser({
          payload: data?.value,
          id: initialValues.id
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      toast.success(`Profile Updated successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: ''
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
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="salutation"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Salutation is required' : undefined
            }}
            children={(field) => (
              <SelectInput
                label="Salutation"
                field={field}
                options={[
                  { value: 'Mr', label: 'Mr' },
                  { value: 'Mrs', label: 'Mrs' },
                  { value: 'Ms', label: 'Ms' },
                  { value: 'Dr', label: 'Dr' }
                ]}
              />
            )}
          />
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
            children={(field) => <TextInput label="First Name" field={field} />}
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
            children={(field) => <TextInput label="Last Name" field={field} />}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            children={(field) => <TextInput label="Email" field={field} />}
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
              <TextInput label="Mobile Number" field={field} />
            )}
          />
        </div>
        <div className="col-span-full mt-10 flex justify-start space-x-4">
          <Button
            type="button"
            className="text-dark w-fit bg-secondary hover:bg-opacity-80 hover:text-background"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Save Changes'}
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
      </CardWrapper>
    </form>
  );
}
