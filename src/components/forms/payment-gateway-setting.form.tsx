'use client';
import React from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import Heading from '../fields/Heading';
import { Switch } from '../fields/Switch';

interface EmailSettingFormValues {
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

interface SMSSettingFormProps {
  initialValues?: EmailSettingFormValues;
}

export default function SystemSettingForm({
  initialValues
}: SMSSettingFormProps) {
  // const router = useRouter();
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    // mutationFn: async (data: EmailSettingFormValues) => {
    //   if (initialValues?.id) {
    //     return await updateEmailSetting(initialValues.id, data);
    //   } else {
    //     return await createEmailSetting(data);
    //   }
    // },
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['email-setting'] });
    //   router.push('/settings/email-setting/');
    //   toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    // },
    // onError: (error: unknown) => {
    //   toast.error(`Error: ${(error as Error).message}`);
    // }
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
        <Heading>Payment Gateway Setting</Heading>
        <div className="my-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Bank Transfer</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Paypal</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Stripe</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Paystack</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Raaorpay</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Paytm</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Google Pay</p>
            <Switch />
          </div>
          <div className="flex justify-between rounded-lg border border-border p-2.5 align-middle text-sm">
            <p>Phone Pay</p>
            <Switch />
          </div>
        </div>
      </CardWrapper>

      <div className="col-span-full mt-10 flex justify-start space-x-4">
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
