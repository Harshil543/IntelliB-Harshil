'use client';
import React, { useState } from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { useForm } from '@tanstack/react-form';
import TextInput from '@components/fields/TextInput';
import { Button } from '@components/ui/button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { changePassword } from '@/services/user.service';
import eyeIcon from '@iconify/icons-mdi/eye';
import eyeOffIcon from '@iconify/icons-mdi/eye-off';
import { Icon } from '@iconify/react';
import Heading from '../fields/Heading';
interface ChangePasswordProps {
  initialValues?: {
    id?: number;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm({
  initialValues
}: ChangePasswordProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      if (initialValues?.id) {
        return await changePassword({
          payload: data,
          id: initialValues.id
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toast.success(`Password Changed successfully`);
    },
    onError: (error: unknown) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
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
        <Heading>Change Password</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="oldPassword"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Old Password is required';
                // Password validation: minimum length and complexity
                if (value.length < 8)
                  return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value))
                  return 'Password must contain at least one uppercase letter';
                if (!/[a-z]/.test(value))
                  return 'Password must contain at least one lowercase letter';
                if (!/[0-9]/.test(value))
                  return 'Password must contain at least one number';
                if (!/[!@#$%^&*()_+{}[\]:;"'<>,.?~`]/.test(value))
                  return 'Password must contain at least one special character';
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="relative">
                <TextInput
                  type={showPassword ? 'text' : 'password'}
                  label="Old Password"
                  field={field}
                  placeholder="*********************"
                  disabled={false}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={showPassword ? eyeIcon : eyeOffIcon}
                    className="text-gray-500"
                  />
                </button>
              </div>
            )}
          </form.Field>
          <form.Field
            name="newPassword"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Old Password is required';
                // Password validation: minimum length and complexity
                if (value.length < 8)
                  return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value))
                  return 'Password must contain at least one uppercase letter';
                if (!/[a-z]/.test(value))
                  return 'Password must contain at least one lowercase letter';
                if (!/[0-9]/.test(value))
                  return 'Password must contain at least one number';
                if (!/[!@#$%^&*()_+{}[\]:;"'<>,.?~`]/.test(value))
                  return 'Password must contain at least one special character';
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="relative">
                <TextInput
                  type={showPassword ? 'text' : 'password'}
                  label="New Password"
                  field={field}
                  placeholder="*********************"
                  disabled={false}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={showPassword ? eyeIcon : eyeOffIcon}
                    className="text-gray-500"
                  />
                </button>
              </div>
            )}
          </form.Field>
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Old Password is required';
                // Password validation: minimum length and complexity
                if (value.length < 8)
                  return 'Password must be at least 8 characters long';
                if (!/[A-Z]/.test(value))
                  return 'Password must contain at least one uppercase letter';
                if (!/[a-z]/.test(value))
                  return 'Password must contain at least one lowercase letter';
                if (!/[0-9]/.test(value))
                  return 'Password must contain at least one number';
                if (!/[!@#$%^&*()_+{}[\]:;"'<>,.?~`]/.test(value))
                  return 'Password must contain at least one special character';
                return undefined;
              }
            }}
          >
            {(field) => (
              <div className="relative">
                <TextInput
                  type={showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  field={field}
                  placeholder="*********************"
                  disabled={false}
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={showPassword ? eyeIcon : eyeOffIcon}
                    className="text-gray-500"
                  />
                </button>
              </div>
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
