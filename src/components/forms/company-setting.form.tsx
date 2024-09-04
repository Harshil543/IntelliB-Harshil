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
import TimePickerInput from '../fields/TimePickerInput';

interface CompanySettingFormValues {
  id?: number;
  companyName: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  address: string;
  telephone: string;
  registrationNumber: string;
  startTime: string;
  endTime: string;
  timezone: string;
  taxNumber: string;
}

interface CompanySettingFormProps {
  initialValues?: CompanySettingFormValues;
}

export default function CompanySettingForm({
  initialValues
}: CompanySettingFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CompanySettingFormValues) => {
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
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm<CompanySettingFormValues>({
    defaultValues: initialValues || {
      companyName: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
      address: '',
      telephone: '',
      registrationNumber: '',
      startTime: '',
      endTime: '',
      timezone: '',
      taxNumber: ''
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
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
        <Heading>Company Setting</Heading>
        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="companyName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Company Name is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Company Name" field={field} />
            )}
          </form.Field>
          <form.Field
            name="city"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'City is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="City" field={field} />
            )}
          </form.Field>

          <form.Field
            name="state"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'State is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="State" field={field} />
            )}
          </form.Field>
          <form.Field
            name="zipcode"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Zip / Post Code is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Zip / Post Code"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="country"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Country is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Country" field={field} />
            )}
          </form.Field>
        </div>

        <div className="mt-4">
          <form.Field
            name="address"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Address is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Address" field={field} />
            )}
          </form.Field>
        </div>

        <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="telephone"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Telephone is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Telephone" field={field} />
            )}
          </form.Field>
          <form.Field
            name="registrationNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Company Registration Number is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={false}
                label="Company Registration Number"
                field={field}
              />
            )}
          </form.Field>
          <form.Field
            name="startTime"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Start Time is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TimePickerInput
                label="Company Start Time"
                field={field}
                placeholder="Select time"
                disabled={false}
              />
            )}
          </form.Field>
          <form.Field
            name="endTime"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'End Time is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TimePickerInput
                label="Company End Time"
                field={field}
                placeholder="Select time"
                disabled={false}
              />
            )}
          </form.Field>
          <form.Field
            name="timezone"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Time Zone is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <SelectInput
                label="Time Zone"
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
          <form.Field
            name="taxNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Tax Number is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput disabled={false} label="Tax Number" field={field} />
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
