'use client';
import React from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { useForm } from '@tanstack/react-form';
import TextInput from '@components/fields/TextInput';
import { Button } from '@components/ui/button';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getUser, updateUser } from '@/services/user.service';
import SelectInput from '@components/fields/SelectInput';

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

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  const mutation = useMutation({
    mutationFn: async (data: {
      salutation: string;
      firstName: string;
      lastName: string;
      email: string;
      mobileNumber: string;
    }) => {
      return updateUser({
        payload: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(`Profile Updated successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      salutation: data?.data?.salutation,
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      email: data?.data?.email,
      mobileNumber: data?.data?.mobileNumber
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
        <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="salutation"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Salutation is required' : undefined
            }}
          >
            {(field) => (
              <SelectInput
                disabled={false}
                label="Salutation"
                field={field}
                options={[
                  { value: 'mr', label: 'Mr' },
                  { value: 'mrs', label: 'Mrs' },
                  { value: 'ms', label: 'Ms' }
                ]}
              />
            )}
          </form.Field>

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
          >
            {(field) => (
              <TextInput disabled={false} label="First Name" field={field} />
            )}
          </form.Field>

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
          >
            {(field) => (
              <TextInput disabled={false} label="Last Name" field={field} />
            )}
          </form.Field>
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
          >
            {(field) => (
              <TextInput disabled={false} label="Email" field={field} />
            )}
          </form.Field>

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
          >
            {(field) => (
              <TextInput disabled={false} label="Mobile Number" field={field} />
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Save Changes'}
              </Button>
            )}
          </form.Subscribe>
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
