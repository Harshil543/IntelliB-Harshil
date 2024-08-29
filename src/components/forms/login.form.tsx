import React from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      console.log('Form Submitted', value);
      router.push('/');
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
        name="email"
        validators={{
          onChange: ({ value }) => (!value ? 'Email is required' : undefined)
        }}
        children={(field) => (
          <TextInput
            type="email"
            label="Email"
            field={field}
            placeholder="example@gamil.com"
          />
        )}
      />
      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => (!value ? 'Password is required' : undefined)
        }}
        children={(field) => (
          <TextInput
            type="password"
            label="Password"
            field={field}
            placeholder="*********************"
          />
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? 'Submitting...' : 'Sign In'}
          </Button>
        )}
      />
    </form>
  );
};
