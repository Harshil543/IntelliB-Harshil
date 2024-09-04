'use client';
import React from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createEmailSetting,
  updateEmailSetting
} from '@/services/email-setting.service';
import Heading from '../fields/Heading';

interface EmailSettingValues {
  id?: number;
  mailDeliver: string;
  mailHost: string;
  mailPort: string;
  mailUsername: string;
  mailPassword: string;
  mailEncryption: string;
  mailFromAddress: string;
  mailFromName: string;
}

interface EmailSettingFormProps {
  initialValues?: {
    id?: number;
    mailDeliver: string;
    mailHost: string;
    mailPort: string;
    mailUsername: string;
    mailPassword: string;
    mailEncryption: string;
    mailFromAddress: string;
    mailFromName: string;
  };
}

export default function EmailSettingForm({
  initialValues
}: EmailSettingFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: EmailSettingValues) => {
      if (initialValues?.id) {
        return await updateEmailSetting({
          payload: data,
          id: initialValues.id
        });
      } else {
        return await createEmailSetting({ payload: data });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-setting'] });
      router.push('/settings/email-setting/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm<EmailSettingValues>({
    defaultValues: initialValues || {
      id: '',
      mailDeliver: '',
      mailHost: '',
      mailPort: '',
      mailUsername: '',
      mailPassword: '',
      mailEncryption: '',
      mailFromAddress: '',
      mailFromName: ''
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
      console.log('Email Setting values', values);
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
        <Heading>Email Notification Setting</Heading>
        <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {/* Form Fields */}
          {/* Switch components */}
        </div>
      </CardWrapper>

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
    </form>
  );
}
