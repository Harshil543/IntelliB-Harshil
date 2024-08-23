import React from 'react';
import CardWrapper from '@/components/CommonComponents/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, updateCompany } from '@/services/company.service';
import toast from 'react-hot-toast';
import {
  createPropertyUser,
  updatePropertyUser
} from '@/services/property-user.service';
import PhoneInputField from '../CommonComponents/PhoneInput';

interface CompanyFormProps {
  initialValues?: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
    role: string;
    designation: string;
    status: string;
  };
}

export default function PropertyUserForm({ initialValues }: CompanyFormProps) {
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
      role: '',
      designation: '',
      status: ''
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
            onChange: ({ value }) =>
              !value ? 'First name is required' : undefined
          }}
          children={(field) => <TextInput label="First Name" field={field} />}
        />
        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Last name is required' : undefined
          }}
          children={(field) => <TextInput label="Last Name" field={field} />}
        />

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => (!value ? 'Email is required' : undefined)
          }}
          children={(field) => (
            <TextInput type="email" label="Email" field={field} />
          )}
        />
        <form.Field
          name="mobileNumber"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Mobile Number is required' : undefined
          }}
          children={(field) => (
            <PhoneInputField label="Mobile Number" field={field} />
          )}
        />

        <form.Field
          name="role"
          validators={{
            onChange: ({ value }) => (!value ? 'Role is required' : undefined)
          }}
          children={(field) => <TextInput label="Role" field={field} />}
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
