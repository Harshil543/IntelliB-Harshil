import React from 'react';
import { Button } from '../ui/button';
import { useForm } from '@tanstack/react-form';
import SelectInput from '../fields/SelectInput';
import TextInput from '../fields/TextInput';
import DatePickerInput from '../fields/DatePickerInput';
import { useMutation } from '@tanstack/react-query';

const LeasaForm = () => {
  const form = useForm();
  const mutation = useMutation({});
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <>
        {/* <Heading>Meter Data</Heading> */}

        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="startDate"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Start Date is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <DatePickerInput
                label="Start Date"
                field={field}
                placeholder="Select a date"
              />
            )}
          </form.Field>
          <form.Field
            name="endDate"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'End Date is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <DatePickerInput
                label="End Date"
                field={field}
                placeholder="Select a date"
              />
            )}
          </form.Field>
          <form.Field
            name="leasableUnitId"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Leasable Unit is required' : undefined
            }}
          >
            {(field) => (
              <SelectInput
                label="Leasable Unit"
                field={field}
                options={[
                  { value: 'leasableunit1', label: 'leasableunit1' },
                  { value: 'leasavbleunit2', label: 'leasavbleunit2' },
                  { value: 'leasableunit3', label: 'leasableunit3' }
                ]}
              />
            )}
          </form.Field>
          <form.Field
            name="rentAmount"
            validators={{
              onChange: ({ value }) => {
                const parsedValue = Number(value);
                if (!value) return 'Rent Amount is required';
                if (isNaN(parsedValue)) return 'Rent Amount must be a number';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput label="Rent Amount" field={field} type="number" />
            )}
          </form.Field>
        </div>
        <div className="col-span-full mt-10 flex justify-start space-x-4">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </>
    </form>
  );
};

export default LeasaForm;
