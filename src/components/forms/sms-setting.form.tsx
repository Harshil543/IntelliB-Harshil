'use client';
import React from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, updateCompany } from '@/services/company.service';
import toast from 'react-hot-toast';
import {
  createEmailSetting,
  updateEmailSetting
} from '@/services/email-setting.service';
import Heading from '../fields/Heading';

interface SMSSettingFormProps {
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

export default function SystemSettingForm({
  initialValues
}: SMSSettingFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateEmailSetting({
          payload: data?.value,
          id: initialValues.id
        });
      } else {
        return await createEmailSetting({ payload: data.value });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['email-setting'] });
      router.push('/settings/email-setting/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
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
      // await mutation.mutateAsync(values);
      console.log('SMS Setting values', values);
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
        <Heading>SMS Setting</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="mailDeliver"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail Deliver is required';
                if (value.length < 3)
                  return 'Mail Deliver must be at least 3 characters';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Mail Deliver" field={field} />
            )}
          </form.Field>
          <form.Field
            name="mailHost"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail Host is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Mail Host" field={field} />
            )}
          </form.Field>
          <form.Field
            name="mailPort"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail Port is required';
                if (!/^\d+$/.test(value)) return 'Mail Port must be a number';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Mail Port" field={field} />
            )}
          </form.Field>
          <form.Field
            name="mailUsername"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail Username is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Mail Username" field={field} />
            )}
          </form.Field>
          <form.Field
            name="mailPassword"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail Password is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Mail Password" field={field} />
            )}
          </form.Field>
          <form.Field
            name="mailEncryption"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail Encryption is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Mail Encryption"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="mailFromAddress"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail From Address is required';
                if (!/\S+@\S+\.\S+/.test(value))
                  return 'Mail From Address must be a valid email';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Mail From Address"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="mailFromName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mail From Name is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Mail From Name"
                field={field}
              />
            )}
          </form.Field>
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
    </form>
  );
}
