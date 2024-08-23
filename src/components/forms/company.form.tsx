import React, { useState } from 'react';
import CardWrapper from '@/components/CommonComponents/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, updateCompany } from '@/services/company.service';
import toast from 'react-hot-toast';
import PhoneInputField from '../CommonComponents/PhoneInput';
import { CountrySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

interface CompanyFormProps {
  initialValues?: {
    id?: number;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    email: string;
    countryCode: string;
    mobileNumber: string;
    websiteUrl: string;
    gstNumber: string;
    cinNumber: string;
  };
}

export default function CompanyForm({ initialValues }: CompanyFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [countryId, setCountryId] = useState<number | null>(null);
  const [stateId, setStateId] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateCompany({
          payload: data?.value,
          id: initialValues.id
        });
        return;
      } else {
        return await createCompany({ payload: data.value });
        return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      router.push('/company/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      companyName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
      email: '',
      countryCode: '',
      mobileNumber: '',
      websiteUrl: '',
      gstNumber: '',
      cinNumber: ''
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    }
  });

  return (
    <CardWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <form.Field
          name="companyName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Company name is required' : undefined
          }}
          children={(field) => <TextInput label="Company Name" field={field} />}
        />

        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => (!value ? 'Email is required' : undefined)
          }}
          children={(field) => (
            <TextInput type="email" label="Email" field={field} />
          )}
        />

        <form.Field
          name="mobileNumber"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Mobile Number is required' : undefined
          }}
          children={(field) => (
            <PhoneInputField label="Mobile Number" field={field} />
          )}
        />

        {/* <form.Field
          name="countryCode"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Country Code is required' : undefined
          }}
          children={(field) => (
            <PhoneInputField label="Country Code" field={field} />
          )}
        /> */}

        <form.Field
          name="addressLine1"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Address Line 1 is required' : undefined
          }}
          children={(field) => (
            <TextInput label="Address Line 1" field={field} />
          )}
        />

        <form.Field
          name="addressLine2"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Address Line 2 is required' : undefined
          }}
          children={(field) => (
            <TextInput label="Address Line 2" field={field} />
          )}
        />

        {/* <form.Field
          name="country"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Country is required' : undefined
          }}
          children={(field) => <TextInput label="Country" field={field} />}
        /> */}
        <form.Field
          name="country"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Country is required' : undefined
          }}
          children={(field) => (
            <CountrySelect
              onChange={(e: any) => {
                form.setFieldValue('countryCode', e.phone_code);
                form.setFieldValue('country', e.name);
                setCountryId(e.id);
              }}
              placeHolder="Select Country"
            />
          )}
        />
        {/* <form.Field
          name="state"
          validators={{
            onChange: ({ value }) => (!value ? 'State is required' : undefined)
          }}
          children={(field) => <TextInput label="State" field={field} />}
        /> */}
        <form.Field
          name="state"
          validators={{
            onChange: ({ value }) => (!value ? 'State is required' : undefined)
          }}
          children={(field) => (
            <StateSelect
              countryid={countryId || 0}
              onChange={(e: any) => {
                setStateId(e.id);
                form.setFieldValue('state', e.name);
              }}
              placeHolder="Select State"
            />
          )}
        />

        <form.Field
          name="city"
          validators={{
            onChange: ({ value }) => (!value ? 'City is required' : undefined)
          }}
          children={(field) => <TextInput label="City" field={field} />}
        />

        <form.Field
          name="pincode"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Pincode is required' : undefined
          }}
          children={(field) => (
            <TextInput type="text" label="Pincode" field={field} />
          )}
        />

        <form.Field
          name="websiteUrl"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Website Url is required' : undefined
          }}
          children={(field) => <TextInput label="Website Url" field={field} />}
        />

        <form.Field
          name="gstNumber"
          validators={{
            onChange: ({ value }) =>
              !value ? 'GST Number is required' : undefined
          }}
          children={(field) => <TextInput label="GST Number" field={field} />}
        />

        <form.Field
          name="cinNumber"
          validators={{
            onChange: ({ value }) =>
              !value ? 'CIN Number is required' : undefined
          }}
          children={(field) => (
            <TextInput type="text" label="CIN Number" field={field} />
          )}
        />

        <div className="col-span-full mt-10 flex space-x-4">
          <Button
            type="button"
            className="text-dark w-fit bg-secondary hover:bg-opacity-80 hover:text-background"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
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
    </CardWrapper>
  );
}
