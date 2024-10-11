// components/TenantForm.tsx
'use client';

import React, { useEffect, useState } from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Heading from '../fields/Heading';
import SelectInput from '../fields/SelectInput';
import { createTenantData, updateTenantData } from '@/services/tenant.service';
import PhoneInputField from '../fields/PhoneInput';
import { City, Country, State } from 'country-state-city';
import LeasaForm from './lease.form';

interface OptionType {
  value: string;
  label: string;
}

interface TenantFormProps {
  initialValues?: {
    company: {
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
    id: number;
    salutation: string;
    firstName: string;
    lastName: string;
    designation: string;
    mobileNumber: string;
    countryCode: string;
    email: string;
  };
  companyIdByUpdate?: number;
}

export const TenantDataForm = ({
  initialValues,
  companyIdByUpdate
}: TenantFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isViewTenant = pathname.includes('view-tenant');

  const [tenantCompanyId, setTenantCompantId] = useState();
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );

  const [countries, setCountries] = useState<OptionType[]>([]);
  const [states, setStates] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);

  useEffect(() => {
    const countryList = Country.getAllCountries().map(({ isoCode, name }) => ({
      value: isoCode,
      label: name
    }));
    setCountries(countryList);
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const updatedData = {
        ...data.value
      };

      // Uncomment below to handle API calls:
      if (initialValues?.id) {
        return await updateTenantData({
          id: initialValues?.id,
          payload: updatedData?.value
        });
      } else {
        return await createTenantData(updatedData?.value);
      }
    },
    onSuccess: (data) => {
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
      setTenantCompantId(data?.company?.id);
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      company: {
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
      salutation: '',
      firstName: '',
      lastName: '',
      designation: '',
      mobileNumber: '',
      countryCode: '',
      email: ''
    },
    onSubmit: async (value: any) => await mutation.mutateAsync({ value })
  });
  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    form.setFieldValue('company.country', selectedOption?.label || '');

    if (selectedOption) {
      const stateList = State.getStatesOfCountry(selectedOption.value).map(
        ({ isoCode, name }) => ({
          value: isoCode,
          label: name
        })
      );
      setStates(stateList);
      form.setFieldValue('company.state', '');
      setCities([]);
    }
  };

  const handleStateChange = (selectedOption: any) => {
    form.setFieldValue('company.state', selectedOption?.label || '');

    if (selectedOption) {
      const cityList = City.getCitiesOfState(
        selectedCountry?.value || '',
        selectedOption.value
      ).map(({ name }) => ({
        value: name,
        label: name
      }));
      setCities(cityList);
      form.setFieldValue('company.city', '');
    }
  };

  const handleCityChange = (selectedOption: any) => {
    form.setFieldValue('company.city', selectedOption?.label || '');
  };
  useEffect(() => {
    if (initialValues) {
      // Set the selected country
      const countryOption = countries.find(
        (country) => country.label === initialValues.company.country
      );
      if (countryOption) {
        setSelectedCountry(countryOption);

        // Fetch states based on the selected country
        const stateList = State.getStatesOfCountry(countryOption.value).map(
          ({ isoCode, name }) => ({
            value: isoCode,
            label: name
          })
        );
        setStates(stateList);

        // Set the selected state
        const stateOption = stateList.find(
          (state) => state.label === initialValues.company.state
        );
        if (stateOption) {
          // setSelectedState(stateOption);

          // Fetch cities based on the selected state
          const cityList = City.getCitiesOfState(
            countryOption.value,
            stateOption.value
          ).map(({ name }) => ({
            value: name,
            label: name
          }));
          setCities(cityList);
        }
      }
    }
  }, [initialValues, countries]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldValue('company.country', initialValues.company.country);
      form.setFieldValue('company.state', initialValues.company.state);
      form.setFieldValue('company.city', initialValues.company.city);
    }
  }, [initialValues, form]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <CardWrapper>
          <Heading className="mt-5">Tenant Company Data</Heading>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <form.Field
              name="company.companyName"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Company name is required';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  label="Company Name"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field
              name="company.email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Email is required';
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value)) return 'Invalid email address';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  type="email"
                  label="Email"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field
              name="company.mobileNumber"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Mobile number is required';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <PhoneInputField
                  disabled={isViewTenant}
                  label="Mobile Number"
                  field={{
                    value: form.getFieldValue('company.mobileNumber'),
                    countryCode: form.getFieldValue('company.countryCode'),
                    setValue: (value: string) =>
                      form.setFieldValue('company.mobileNumber', value),
                    setCountryCode: (code: string) =>
                      form.setFieldValue('company.countryCode', code),
                    errorMessage: field.state.meta.errors.length
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }}
                />
              )}
            </form.Field>

            <form.Field
              name="company.addressLine1"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Address Line 1 is required' : undefined
              }}
            >
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  label="Address Line 1"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field
              name="company.addressLine2"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Address Line 2 is required' : undefined
              }}
            >
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  label="Address Line 2"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field
              name="company.country"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Country is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  disabled={isViewTenant}
                  label="Country"
                  field={field}
                  options={countries}
                  placeholder="Select Country"
                  onChange={handleCountryChange}
                />
              )}
            </form.Field>

            <form.Field
              name="company.state"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'State is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  disabled={isViewTenant}
                  label="State"
                  field={field}
                  options={states}
                  placeholder="Select State"
                  onChange={handleStateChange}
                />
              )}
            </form.Field>

            <form.Field
              name="company.city"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'City is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  disabled={isViewTenant}
                  label="City"
                  field={field}
                  options={cities}
                  placeholder="Select City"
                  onChange={handleCityChange}
                />
              )}
            </form.Field>

            <form.Field
              name="company.pincode"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Pincode is required' : undefined
              }}
            >
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  type="text"
                  label="Pincode"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field name="company.websiteUrl">
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  label="Website URL"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field name="company.gstNumber">
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  label="GST Number"
                  field={field}
                />
              )}
            </form.Field>

            <form.Field name="company.cinNumber">
              {(field) => (
                <TextInput
                  disabled={isViewTenant}
                  label="CIN Number"
                  field={field}
                />
              )}
            </form.Field>
          </div>
        </CardWrapper>
        <CardWrapper>
          <Heading className="mt-5">Tenant Personal Data</Heading>
          <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <form.Field
              name="salutation"
              validators={{
                onChange: ({ value }) =>
                  !value ? 'Salutation is required' : undefined
              }}
            >
              {(field) => (
                <SelectInput
                  disabled={isViewTenant}
                  label="Salutation"
                  field={field}
                  options={[
                    { value: 'mr', label: 'mr' },
                    { value: 'mrs', label: 'mrs' },
                    { value: 'ms', label: 'ms' }
                  ]}
                />
              )}
            </form.Field>
            <form.Field
              name="firstName"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'First Name is required';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  label="First Name"
                  field={field}
                  disabled={isViewTenant}
                />
              )}
            </form.Field>
            <form.Field
              name="lastName"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Last Name is required';

                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  label="Last Name"
                  field={field}
                  disabled={isViewTenant}
                />
              )}
            </form.Field>

            <form.Field
              name="designation"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Designation is required';

                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  type="text"
                  label="Designation"
                  field={field}
                  disabled={isViewTenant}
                />
              )}
            </form.Field>
            <form.Field
              name="mobileNumber"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Mobile Number is required';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <PhoneInputField
                  disabled={isViewTenant}
                  label="Mobile Number"
                  field={{
                    value: form.getFieldValue('mobileNumber'),
                    countryCode: form.getFieldValue('countryCode'),
                    setValue: (value: string) =>
                      form.setFieldValue('mobileNumber', value),
                    setCountryCode: (code: string) =>
                      form.setFieldValue('countryCode', code),
                    errorMessage: field.state.meta.errors.length
                      ? field.state.meta.errors.join(', ')
                      : undefined
                  }}
                />
              )}
            </form.Field>
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  if (!value) return 'Email is required';
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                  if (!emailRegex.test(value)) return 'Invalid email format';
                  return undefined;
                }
              }}
            >
              {(field) => (
                <TextInput
                  label="Email"
                  field={field}
                  disabled={isViewTenant}
                />
              )}
            </form.Field>
          </div>
        </CardWrapper>

        <div className="col-span-full mt-10 flex justify-start space-x-4">
          <Button
            type="button"
            className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          {!isViewTenant && (
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
          )}
        </div>
      </form>
      {tenantCompanyId
        ? tenantCompanyId
        : companyIdByUpdate && (
            <CardWrapper>
              <Heading className="mt-5">Lease Data</Heading>
              <LeasaForm
                companyId={
                  tenantCompanyId ? tenantCompanyId : companyIdByUpdate
                }
              />
            </CardWrapper>
          )}
    </>
  );
};
