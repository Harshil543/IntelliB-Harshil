'use client';
import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';
import CardWrapper from '@/components/CommonComponents/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/CommonComponents/TextInput';
import { useRouter } from 'next/navigation';

export default function CompanyRegister() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
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
    onSubmit: async ({ value }) => {
      console.log('Form Submitted', value);
    }
  });

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Company" />

      <CardWrapper>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
            children={(field) => (
              <TextInput label="Company Name" field={field} />
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Email is required' : undefined
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
              <TextInput type="number" label="Mobile Number" field={field} />
            )}
          />
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
          <form.Field
            name="city"
            validators={{
              onChange: ({ value }) => (!value ? 'City is required' : undefined)
            }}
            children={(field) => <TextInput label="City" field={field} />}
          />
          <form.Field
            name="state"
            validators={{
              onChange: ({ value }) =>
                !value ? 'State is required' : undefined
            }}
            children={(field) => <TextInput label="State" field={field} />}
          />

          <form.Field
            name="country"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Country is required' : undefined
            }}
            children={(field) => <TextInput label="Country" field={field} />}
          />

          <form.Field
            name="countryCode"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Country Code is required' : undefined
            }}
            children={(field) => (
              <TextInput type="number" label="Country Code" field={field} />
            )}
          />

          <form.Field
            name="pincode"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Pincode is required' : undefined
            }}
            children={(field) => (
              <TextInput type="number" label="Pincode" field={field} />
            )}
          />

          <form.Field
            name="websiteUrl"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Website Url is required' : undefined
            }}
            children={(field) => (
              <TextInput label="Website Url" field={field} />
            )}
          />

          <form.Field
            name="gstNumber"
            validators={{
              onChange: ({ value }) =>
                !value ? 'GST Number is required' : undefined
            }}
            children={(field) => (
              <TextInput type="number" label="GST Number" field={field} />
            )}
          />
          <form.Field
            name="cinNumber"
            validators={{
              onChange: ({ value }) =>
                !value ? 'CIN Number is required' : undefined
            }}
            children={(field) => (
              <TextInput type="number" label="CIN Number" field={field} />
            )}
          />

          <div className="col-span-full mt-10 flex space-x-4">
            <Button
              type="button"
              className={`text-dark w-fit bg-secondary hover:bg-opacity-80 hover:text-background`}
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              )}
            />
          </div>
        </form>
      </CardWrapper>
    </div>
  );
}
