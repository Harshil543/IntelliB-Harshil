import React from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useForm } from '@tanstack/react-form';

const ResetPasswordFrom = () => {
  const form = useForm({
    defaultValues: {
      new_password: '',
      confirm_password: ''
    },
    onSubmit: async ({ value }) => {
      console.log('Reset Password Form Submitted ', value);
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
        name="new_password"
        validators={{
          onChange: ({ value }) =>
            !value ? 'New Password is required' : undefined
        }}
        children={(field) => (
          <TextInput
            type="new_password"
            label="New Password"
            field={field}
            placeholder="*********************"
          />
        )}
      />
      <form.Field
        name="confirm_password"
        validators={{
          onChange: ({ value }) =>
            !value ? 'Confirm Password is required' : undefined
        }}
        children={(field) => (
          <TextInput
            type="confirm_password"
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
