'use client';
import React from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { useForm } from '@tanstack/react-form';
import TextInput from '../CommonComponents/TextInput';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { changePassword } from '@/services/user.service';

interface ChangePasswordProps {
  initialValues?: {
    id?: number;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
}
export default function ChangePasswordForm({
  initialValues
}: ChangePasswordProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await changePassword({
          payload: data?.value,
          id: initialValues.id
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(`Password Changed successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
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
            name="oldPassword"
            children={(field) => (
              <TextInput
                label="Old Password"
                field={field}
                placeholder="**********************"
              />
            )}
          />
          <form.Field
            name="newPassword"
            children={(field) => (
              <TextInput
                label="New Password"
                field={field}
                placeholder="**********************"
              />
            )}
          />
          <form.Field
            name="confirmPassword"
            children={(field) => (
              <TextInput
                label="Confirm Password"
                field={field}
                placeholder="**********************"
              />
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
