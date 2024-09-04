import React from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';

import SelectInput from '../fields/SelectInput';
import Heading from '../fields/Heading';

interface SystemSettingFormValues {
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
}

interface SystemSettingFormProps {
  initialValues?: SystemSettingFormValues;
}

export default function SystemSettingForm({
  initialValues
}: SystemSettingFormProps) {
  const mutation = useMutation({
    // mutationFn: async (data: SystemSettingFormValues) => {
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
    // onError: (error) => {
    //   toast.error(`Error: ${error.message}`);
    // }
  });

  const form = useForm<SystemSettingFormValues>({
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
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
      console.log('System Setting Values', values);
    }
  });

  const fields = [
    { name: 'currency', label: 'Currency', type: 'text' },
    { name: 'currencySymbol', label: 'Currency Symbol', type: 'text' },
    {
      name: 'currencySymbolPosition',
      label: 'Currency Symbol Position',
      type: 'select',
      options: [{ label: 'abc', value: 'abc' }]
    },
    {
      name: 'dateFormate',
      label: 'Date Formate',
      type: 'select',
      options: [{ label: 'abc', value: 'abc' }]
    },
    {
      name: 'timeFormate',
      label: 'Time Formate',
      type: 'select',
      options: [{ label: 'abc', value: 'abc' }]
    },
    { name: 'customerPrefix', label: 'Customer Prefix', type: 'text' },
    { name: 'venderPrefix', label: 'Vender Prefix', type: 'text' },
    { name: 'proposalPrefix', label: 'Proposal Prefix', type: 'text' },
    { name: 'invoicePrefix', label: 'Invoice Prefix', type: 'text' },
    { name: 'billPrefix', label: 'Bill Prefix', type: 'text' },
    { name: 'purchasePrefix', label: 'Purchase Prefix', type: 'text' },
    { name: 'posPrefix', label: 'POS Prefix', type: 'text' },
    { name: 'expensePrefix', label: 'Expense Prefix', type: 'text' },
    {
      name: 'displayShippingProposal',
      label: 'Display Shipping in Proposal / Invoice/ Bill',
      type: 'select',
      options: [{ label: 'abc', value: 'abc' }],
      placeholder: 'Display Shipping Proposal'
    }
  ];

  return (
    <form onSubmit={form.handleSubmit}>
      <CardWrapper>
        <Heading>System Setting</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fields.map(({ name, label, type, options = [], placeholder }) => (
            <div key={name} className="mt-4">
              <form.Field
                name={name as keyof SystemSettingFormValues}
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return `${label} is required`;
                    return undefined;
                  }
                }}
              >
                {(field) => {
                  if (type === 'select') {
                    return (
                      <SelectInput
                        label={label}
                        field={field}
                        options={options} // Default empty array
                        disabled={false}
                        placeholder={placeholder}
                      />
                    );
                  }
                  return (
                    <TextInput disabled={false} label={label} field={field} />
                  );
                }}
              </form.Field>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <form.Field
            name={'title'}
            validators={{
              onChange: ({ value }) => {
                if (!value)
                  return `${'Proposal / Invoice/ Bill / Purchase/ POS Footer  Title'} is required`;
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label={'Proposal / Invoice/ Bill / Purchase/ POS Footer  Title'}
                field={field}
              />
            )}
          </form.Field>
        </div>
        <div className="mt-4">
          <form.Field
            name={'note'}
            validators={{
              onChange: ({ value }) => {
                if (!value)
                  return `${'Proposal / Invoice/ Bill / Purchase/ POS Footer  Note'} is required`;
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label={'Proposal / Invoice/ Bill / Purchase/ POS Footer  Note'}
                field={field}
              />
            )}
          </form.Field>
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
