import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { useForm } from '@tanstack/react-form';
import toast from 'react-hot-toast';
import { resetPassword } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-mdi/eye';
import eyeOffIcon from '@iconify/icons-mdi/eye-off';

// Define a type for the form values
interface ResetPasswordValues {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: ResetPasswordValues) => {
      return await resetPassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });
    },
    onSuccess: () => {
      toast.success('Password reset successful');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: {
      newPassword: '',
      confirmPassword: ''
    },
    onSubmit: async (value) => {
      await mutation.mutateAsync(value);
    }
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="grid w-full grid-cols-1 gap-4"
    >
      <form.Field
        name="newPassword"
        validators={{
          onChange: ({ value }) => {
            if (!value) return 'New Password is required';
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
              type={showNewPassword ? 'text' : 'password'}
              label="New Password"
              field={field}
              placeholder="*********************"
              disabled={false}
            />
            <button
              type="button"
              className="absolute right-3 top-9 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <Icon
                icon={showNewPassword ? eyeIcon : eyeOffIcon}
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
            if (!value) return 'Confirm Password is required';
            if (value !== form.getFieldValue('newPassword'))
              return 'Passwords must match';
            return undefined;
          }
        }}
      >
        {(field) => (
          <div className="relative">
            <TextInput
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              field={field}
              placeholder="*********************"
              disabled={false}
            />
            <button
              type="button"
              className="absolute right-3 top-9 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Icon
                icon={showConfirmPassword ? eyeIcon : eyeOffIcon}
                className="text-gray-500"
              />
            </button>
          </div>
        )}
      </form.Field>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className="bg-primary">
            {isSubmitting ? 'Submitting...' : 'Update'}
          </Button>
        )}
      </form.Subscribe>

      {mutation.isError && (
        <div className="col-span-full text-red-500">
          {mutation.error instanceof Error
            ? mutation.error.message
            : 'An error occurred during submission.'}
        </div>
      )}
    </form>
  );
};

export default ResetPasswordForm;
