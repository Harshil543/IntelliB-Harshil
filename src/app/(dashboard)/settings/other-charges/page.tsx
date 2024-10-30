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
  const [billingModel, setBillingModel] = useState('fixed');
  const [showForm, setShowForm] = useState(false);

  const data = [
    {
      createdAt: '2024-10-28T04:59:27.771Z',
      updatedAt: '2024-10-28T04:59:27.771Z',
      id: 2,
      name: 'MAINTENANCE',
      chargeType: 'FIXED',
      value: '200.00',
      applicableOn: 'ALL',
      isActive: true
    },
    {
      createdAt: '2024-10-28T04:56:21.454Z',
      updatedAt: '2024-10-28T04:56:21.454Z',
      id: 1,
      name: 'GST',
      chargeType: 'PERCENTAGE',
      value: '18.00',
      applicableOn: 'ALL',
      isActive: true
    }
  ];

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Button onClick={() => setShowForm(true)}>Add Other Charges</Button>
      </div>

      <CardWrapper>
        <div className="grid w-full grid-cols-3 items-center gap-4">
          {data.map((item, i) => {
            const formattedLabel =
              item.name.length <= 3
                ? item.name.toUpperCase()
                : item.name.charAt(0).toUpperCase() +
                  item.name.slice(1).toLowerCase();

            return (
              <div key={i}>
                <Label htmlFor={item.name}>{formattedLabel}</Label>

                <div className="h-10 rounded-lg border border-border p-2 text-sm">
                  {item.chargeType === 'FIXED' && '₹'} {item.value}
                  {item.chargeType === 'PERCENTAGE' && '%'}
                </div>
              </div>
            );
          })}
        </div>
      </CardWrapper>

      {showForm && (
        <CardWrapper>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <div className="grid w-full grid-cols-3 items-center gap-0">
              <Label htmlFor="chargesName">Charges Name</Label>
              <form.Field name="name">
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
                    name="chargeType"
                    value="fixed"
                    checked={billingModel === 'fixed'}
                    onChange={() => setBillingModel('fixed')}
                  />
                  <span>Fixed Amount</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="chargeType"
                    value="percentage"
                    checked={billingModel === 'percentage'}
                    onChange={() => setBillingModel('percentage')}
                  />
                  <span>Percentage</span>
                </label>
              </div>
            </div>

            <div className="mt-4 grid w-full grid-cols-3 items-center gap-0">
              <Label htmlFor="amountPercentage">Amount/Percentage</Label>
              <form.Field name="value">
                {(field) => (
                  <TextInput field={field} placeholder="Amount/Percentage" />
                )}
              </form.Field>
            </div>

            <div className="col-span-full mt-10 flex space-x-4">
              <Button
                type="button"
                className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
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
      )}
    </div>
  );
};

export default OtherCharges;
