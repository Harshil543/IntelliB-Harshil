'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useForm } from '@tanstack/react-form';
import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';

const ResetPassword = () => {
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
    <AuthWrapper>
      <div className="flex h-full w-full justify-center p-4 align-middle lg:p-8">
        <div className="xs:w-[90%] mt-[10%] flex flex-col justify-start space-y-2 align-middle sm:w-[90%] lg:w-[50%]">
          <div className="mb-10 flex flex-col items-center space-y-2">
            <Image src={logo} className="w-40" alt="IntelliB logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Reset Your Password
            </h1>
            <p className="text-sm">For business, band or celebrity.</p>
          </div>

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
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ResetPassword;
