'use client';
import React from 'react';
import Heading from '../fields/Heading';
import CardWrapper from '../layout/CardWrapper';
import { useForm } from '@tanstack/react-form';
import SelectInput from '../fields/SelectInput';
import DatePickerInput from '../fields/DatePickerInput';

const BillingCyleForm = () => {
  const form = useForm({});
  return (
    <div>
      <Heading>Set Billing Cycle</Heading>
      <CardWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-1">
            <form.Field
              name="billCycle"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Bill Cycle is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  disabled={false}
                  label="Select Bill Cycle"
                  field={field}
                  options={[]}
                />
              )}
            </form.Field>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <form.Field
              name="startDate"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Start Date is required' : undefined
              }}
            >
              {(field) => (
                <DatePickerInput
                  label="Start Date"
                  field={field}
                  placeholder="Select start date"
                  disabled={false}
                />
              )}
            </form.Field>
            <form.Field
              name="endDate"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'End Date is required' : undefined
              }}
            >
              {(field) => (
                <DatePickerInput
                  label="End Date"
                  field={field}
                  placeholder="Select end date"
                  disabled={false}
                />
              )}
            </form.Field>
            <form.Field
              name="status"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Status is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  disabled={false}
                  label="Select status"
                  field={field}
                  options={[]}
                />
              )}
            </form.Field>
          </div>
        </form>
      </CardWrapper>
    </div>
  );
};

export default BillingCyleForm;
