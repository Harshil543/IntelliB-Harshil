'use client';
import TextInput from '@/components/fields/TextInput';
import CardWrapper from '@/components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

const OtherCharges = () => {
  const mutation = useMutation({});
  const form = useForm({});
  const [billingModel, setBillingModel] = useState('fixed'); // Default to 'fixed'

  const data = [
    {
      chargesName: 'GST',
      billingModel: 'percentage',
      rate: '18'
    },
    {
      chargesName: 'Admin Fee',
      billingModel: 'amount',
      rate: '250'
    },
    {
      chargesName: 'Maintainance Fee',
      billingModel: 'amount',
      rate: '1200'
    }
  ];
  return (
    <div>
      <CardWrapper>
        <div className="grid w-full grid-cols-3 items-center gap-4">
          {data.map((item, i) => {
            return (
              <div key={i}>
                <Label htmlFor={item.chargesName}>{item.chargesName}</Label>
                <div className="h-10 rounded-lg border border-border p-2 text-sm">
                  {item.billingModel === 'amount' && '₹'} {item.rate}
                  {item.billingModel === 'percentage' && '%'}
                </div>
              </div>
            );
          })}
        </div>
      </CardWrapper>
      <CardWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid w-full grid-cols-3 items-center gap-0">
            <Label htmlFor="chargesName">Charges Name</Label>
            <form.Field name="chargesName">
              {(field) => (
                <TextInput field={field} placeholder="Charges name" />
              )}
            </form.Field>
          </div>

          <div className="mt-4 grid w-full grid-cols-3 items-center gap-0">
            <Label>Choose Billing Model</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="billingModel"
                  value="fixed"
                  checked={billingModel === 'fixed'}
                  onChange={() => setBillingModel('fixed')}
                />
                <span>Fixed Amount</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="billingModel"
                  value="p"
                  checked={billingModel === 'percentage'}
                  onChange={() => setBillingModel('percentage')}
                />
                <span>Percentage</span>
              </label>
            </div>
          </div>

          <div className="mt-4 grid w-full grid-cols-3 items-center gap-0">
            <Label htmlFor="amountPercentage">Amount/Percentage</Label>
            <form.Field name="amountPercentage">
              {(field) => (
                <TextInput field={field} placeholder="Amount/Percentage" />
              )}
            </form.Field>
          </div>

          <div className="col-span-full mt-10 flex justify-start space-x-4">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || mutation.isPending}
                >
                  {mutation.isPending ? 'Submitting...' : 'Submit'}
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
      </CardWrapper>
    </div>
  );
};

export default OtherCharges;
