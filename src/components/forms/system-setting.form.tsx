'use client';
import React from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  createEmailSetting,
  updateEmailSetting
} from '@/services/email-setting.service';
import SelectInput from '../fields/SelectInput';
import Heading from '../fields/Heading';

interface SystemSettingFormProps {
  initialValues?: {
    id?: number;
    currency: string;
    currencySymbol: string;
    currencySymbolPosition: string;
    dateFormate: string;
    timeFormate: string;
    customerPrefix: string;
    venderPrefix: string;
    proposalPrefix: string;
    invoicePrefix: string;
    billPrefix: string;
    purchasePrefix: string;
    posPrefix: string;
    expensePrefix: string;
    displayShippingProposal: string;
    title: string;
    note: string;
  };
}

export default function SystemSettingForm({
  initialValues
}: SystemSettingFormProps) {
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
      currency: '',
      currencySymbol: '',
      currencySymbolPosition: '',
      dateFormate: '',
      timeFormate: '',
      customerPrefix: '',
      venderPrefix: '',
      proposalPrefix: '',
      invoicePrefix: '',
      billPrefix: '',
      purchasePrefix: '',
      posPrefix: '',
      expensePrefix: '',
      displayShippingProposal: '',
      title: '',
      note: ''
    },
    onSubmit: async (values) => {
      // await mutation.mutateAsync(values);
      console.log('System Setting Values', values);
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
        <Heading>System Setting</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="currency"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Currency is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Currency" field={field} />
            )}
          </form.Field>
          <form.Field
            name="currencySymbol"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Currency Symbol is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Currency Symbol"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="currencySymbolPosition"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Currency Symbol Position is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <SelectInput
                label="Currency Symbol Position"
                field={field}
                options={[
                  { label: 'abc', value: 'abc' },
                  { label: 'abc', value: 'abc' }
                ]}
                disabled={false}
              />
            )}
          </form.Field>
          <form.Field
            name="dateFormate"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Date Formate is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <SelectInput
                label="Date Formate"
                field={field}
                options={[
                  { label: 'abc', value: 'abc' },
                  { label: 'abc', value: 'abc' }
                ]}
                disabled={false}
              />
            )}
          </form.Field>
          <form.Field
            name="timeFormate"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Time Formate is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <SelectInput
                label="Time Formate"
                field={field}
                options={[
                  { label: 'abc', value: 'abc' },
                  { label: 'abc', value: 'abc' }
                ]}
                disabled={false}
              />
            )}
          </form.Field>
          <form.Field
            name="customerPrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Customer Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Customer Prefix"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="venderPrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Vender Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Vender Prefix" field={field} />
            )}
          </form.Field>
          <form.Field
            name="proposalPrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Proposal Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Proposal Prefix"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="invoicePrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Invoice Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Invoice Prefix"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="billPrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Bill Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Bill Prefix" field={field} />
            )}
          </form.Field>
          <form.Field
            name="purchasePrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Purchase Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Purchase Prefix"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="posPrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'POS Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="POS Prefix" field={field} />
            )}
          </form.Field>
          <form.Field
            name="expensePrefix"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Expense Prefix is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Expense Prefix"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="displayShippingProposal"
            validators={{
              onChange: ({ value }) => {
                if (!value)
                  return 'Display Shipping in Proposal / Invoice/ Bill is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <SelectInput
                label="Display Shipping in Proposal / Invoice/ Bill"
                field={field}
                options={[
                  { label: 'abc', value: 'abc' },
                  { label: 'abc', value: 'abc' }
                ]}
                disabled={false}
                placeholder="Display Shipping Proposal"
              />
            )}
          </form.Field>
        </div>
        <div className="mt-4">
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Title is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Proposal / Invoice/ Bill / Purchase/ POS Footer  Title"
                field={field}
              />
            )}
          </form.Field>
        </div>
        <div className="mt-4">
          <form.Field
            name="note"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Note is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Proposal / Invoice/ Bill / Purchase/ POS Footer  Note"
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
