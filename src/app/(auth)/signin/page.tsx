'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

const SignIn = () => {
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
    <AuthWrapper>
      <div className="flex h-full w-full justify-center bg-background p-4 align-middle lg:p-8">
        <div className="mt-[10%] flex flex-col justify-start space-y-2 align-middle sm:w-[350px] lg:w-[50%]">
          <div className="mb-10 flex flex-col items-center space-y-2">
            <Image src={logo} className="w-40" alt="IntelliB logo" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
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
              name="email"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Email is required' : undefined
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
                onChange: ({ value }) =>
                  !value ? 'Password is required' : undefined
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

            <Link href={'#'}>
              <p className="text-sm text-slate-500 underline">
                Forgot password?
              </p>
            </Link>

            <div className="my-3 flex justify-between align-middle text-xs">
              <div className="flex justify-center align-middle">
                <Checkbox />
                &nbsp;&nbsp;Remember Me
              </div>
              <div className="flex justify-center align-middle">
                <Checkbox />
                &nbsp;&nbsp;I agree to all the&nbsp;
                <Link href={'#'} className="text-slate-500">
                  Terms
                </Link>
                &nbsp;and&nbsp;
                <Link href={'#'} className="text-slate-500">
                  Privacy Policy
                </Link>
              </div>
            </div>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? 'Submitting...' : 'Sign In'}
                </Button>
              )}
            />
          </form>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
