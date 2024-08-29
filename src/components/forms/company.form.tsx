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
// import { CountrySelect, StateSelect } from 'react-country-state-city';
// import 'react-country-state-city/dist/react-country-state-city.css';
import { Label } from '@/components/ui/label';

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

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return await updateCompany({
          payload: data?.value,
          id: initialValues.id
        });
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
      cinNumber: '',
      status: 'Active'
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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="companyName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Company name is required';
                if (value.length < 3)
                  return 'Company name must be at least 3 characters';

                return undefined;
              }
            }}
            children={(field) => (
              <TextInput label="Company Name" field={field} />
            )}
          />

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Invalid email address';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput type="email" label="Email" field={field} />
            )}
          />

          <form.Field
            name="mobileNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mobile Number is required';
                return undefined;
              }
            }}
            children={(field) => {
              return (
                <PhoneInputField
                  label="Mobile Number"
                  field={{
                    value: form.getFieldValue('mobileNumber'),
                    countryCode: form.getFieldValue('countryCode'),
                    setValue: (value: string) => {
                      form.setFieldValue('mobileNumber', value);
                    },
                    setCountryCode: (code: string) => {
                      form.setFieldValue('countryCode', code);
                    },
                    errorMessage: field.state.meta.errors.length
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }}
                />
              );
            }}
          />
        </div>
      </CardWrapper>
      <CardWrapper>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
            name="country"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Country is required' : undefined
            }}
            children={(field) => (
              <div>
                <Label>Country</Label>
                {/* <CountrySelect
                  onChange={(e: any) => {
                    form.setFieldValue('country', e.name);
                    setCountryId(e.id);
                  }}
                  placeHolder="Select Country"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <span className="text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </span>
                ) : null} */}
              </div>
            )}
          />

          <form.Field
            name="state"
            validators={{
              onChange: ({ value }) =>
                !value ? 'State is required' : undefined
            }}
            children={(field) => (
              <div>
                <Label>State</Label>
                {/* <StateSelect
                  countryid={countryId || 0}
                  onChange={(e: any) => {
                    form.setFieldValue('state', e.name);
                  }}
                  placeHolder="Select State"
                />
                {field.state.meta.isTouched &&
                field.state.meta.errors.length ? (
                  <span className="text-sm text-red-600">
                    {field.state.meta.errors.join(', ')}
                  </span>
                ) : null} */}
              </div>
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
              onChange: ({ value }) => {
                if (!value) return 'Pincode is required';
                if (!/^\d+$/.test(value)) return 'Pincode must be numeric';
                if (value.length !== 6) return 'Pincode must be 6 digits long';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput type="text" label="Pincode" field={field} />
            )}
          />
        </div>
      </CardWrapper>
      <CardWrapper>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="websiteUrl"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Website URL is required';
                const urlRegex =
                  /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/?].*)?$/;
                if (!urlRegex.test(value)) return 'Invalid Website URL';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput label="Website URL" field={field} />
            )}
          />

          <form.Field
            name="gstNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'GST Number is required';
                const gstRegex =
                  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
                if (!gstRegex.test(value))
                  return 'Invalid GST Number (should be 15 characters long)';
                return undefined;
              }
            }}
            children={(field) => <TextInput label="GST Number" field={field} />}
          />

          <form.Field
            name="cinNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'CIN Number is required';
                const cinRegex =
                  /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
                if (!cinRegex.test(value))
                  return 'Invalid CIN Number (should be 21 characters long and in the correct format)';
                return undefined;
              }
            }}
            children={(field) => (
              <TextInput type="text" label="CIN Number" field={field} />
            )}
          />
        </div>
      </CardWrapper>

      <div className="col-span-full mt-10 flex justify-end space-x-4">
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
  );
}
