'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { useForm } from '@tanstack/react-form';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '@assets/images/logo.png';
import AuthWrapper from '@/components/layout/AuthWrapper';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services/auth.service';
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-mdi/eye';
import eyeOffIcon from '@iconify/icons-mdi/eye-off';

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await loginUser({
        email: data?.value?.email,
        password: data?.value?.password
      });
    },
    onSuccess: () => {
      toast.success('Login successful');
      router.push('/');
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async (value) => {
      await mutation.mutateAsync(value);
    }
  });

  return (
    <AuthWrapper>
      <div className="flex h-full w-full justify-center bg-background p-4 align-middle lg:p-8">
        <div className="sm:w[100%] mt-[10%] flex flex-col justify-start space-y-2 align-middle sm:w-[100%] lg:w-[50%]">
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
                onChange: ({ value }) => {
                  if (!value) return 'Email is required';
                  // Email pattern validation
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value)) return 'Invalid email format';
                  return undefined;
                }
              }}
              children={(field) => (
                <TextInput
                  type="email"
                  label="Email"
                  field={field}
                  placeholder="example@gamil.com"
                  disabled={false}
                />
              )}
            />
            <form.Field
              name="password"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Password is required';
                  // Password validation: minimum length and complexity
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
                <div className="relative">
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
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
