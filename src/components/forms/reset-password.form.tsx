import React from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useForm } from '@tanstack/react-form';
import toast from 'react-hot-toast';
import { resetPassword } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';

const ResetPasswordFrom = () => {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await resetPassword({
        newPassword: data?.value?.newPassword,
        confirmPassword: data?.value?.confirmPassword
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
            if (!/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~`]/.test(value))
              return 'Password must contain at least one special character';
            return undefined;
          }
        }}
        children={(field) => (
          <TextInput
            type="password"
            label="New Password"
            field={field}
            placeholder="*********************"
          />
        )}
      />
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
        children={(field) => (
          <TextInput
            type="password"
            label="Confirm Password"
            field={field}
            placeholder="*********************"
          />
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Submitting...' : 'Update'}
          </Button>
        )}
      />
    </form>
  );
};

export default ResetPasswordFrom;
