'use client';
import React, { useEffect, useState } from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { createCompany, updateCompany } from '@/services/company.service';
import PhoneInputField from '../fields/PhoneInput';
import { Country, State, City } from 'country-state-city';
import SelectInput from '@components/fields/SelectInput';
import toast from 'react-hot-toast';

interface OptionType {
  value: string;
  label: string;
}

interface CompanyFormValues {
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
}

interface CompanyFormProps {
  initialValues?: CompanyFormValues;
}

export default function CompanyForm({ initialValues }: CompanyFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isViewCompany = pathname.includes('view-company');
  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );

  const [selectedState, setSelectedState] = useState<OptionType | null>(null);

  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);
  const [cities, setCities] = useState<{ value: string; label: string }[]>([]);

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
        ...data.value,
        country: selectedCountry?.label || '',
        state: selectedState?.label || ''
      };

      if (initialValues?.id) {
        return await updateCompany(initialValues.id, updatedData);
      } else {
        return await createCompany(updatedData);
      }
    },
    onSuccess: () => {
      router.push('/company');
      toast.success(
        `${initialValues?.id ? 'Company Update' : 'Comapany registered'} successfully`
      );
    },
    onError: (error) => {
      toast.error(`Error: ${(error as Error).message}`);
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
      companyLogo: ''
    },
    onSubmit: async (value: any) => {
      await mutation.mutateAsync(value);
    }
  });

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    form.setFieldValue('country', selectedOption?.label || '');

    if (selectedOption) {
      const stateList = State.getStatesOfCountry(selectedOption.value).map(
        ({ isoCode, name }) => ({
          value: isoCode,
          label: name
        })
      );
      setStates(stateList);
      setSelectedState(null);
      form.setFieldValue('state', '');
      setCities([]);
    }
  };

  const handleStateChange = (selectedOption: any) => {
    setSelectedState(selectedOption);
    form.setFieldValue('state', selectedOption?.label || '');

    if (selectedOption) {
      const cityList = City.getCitiesOfState(
        selectedCountry?.value || '',
        selectedOption.value
      ).map(({ name }) => ({
        value: name,
        label: name
      }));
      setCities(cityList);
      form.setFieldValue('city', '');
    }
  };

  const handleCityChange = (selectedOption: any) => {
    form.setFieldValue('city', selectedOption?.label || '');
  };

  useEffect(() => {
    if (initialValues) {
      // Set the selected country
      const countryOption = countries.find(
        (country) => country.label === initialValues.country
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
          (state) => state.label === initialValues.state
        );
        if (stateOption) {
          setSelectedState(stateOption);

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
      form.setFieldValue('country', initialValues.country);
      form.setFieldValue('state', initialValues.state);
      form.setFieldValue('city', initialValues.city);
    }
  }, [initialValues, form]);

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
          >
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="Company Name"
                field={field}
              />
            )}
          </form.Field>

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
          >
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                type="email"
                label="Email"
                field={field}
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
                disabled={isViewCompany}
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
        </div>
      </CardWrapper>

      <CardWrapper>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field name="addressLine1">
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="Address Line 1"
                field={field}
              />
            )}
          </form.Field>

          <form.Field name="addressLine2">
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="Address Line 2"
                field={field}
              />
            )}
          </form.Field>

          <form.Field
            name="country"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Country is required' : undefined
            }}
          >
            {(field) => (
              <SelectInput
                disabled={isViewCompany}
                label="Country"
                field={field}
                options={countries}
                placeholder="Select Country"
                onChange={handleCountryChange}
              />
            )}
          </form.Field>

          <form.Field
            name="state"
            validators={{
              onChange: ({ value }) =>
                !value ? 'State is required' : undefined
            }}
          >
            {(field) => (
              <SelectInput
                disabled={isViewCompany}
                label="State"
                field={field}
                options={states}
                placeholder="Select State"
                onChange={handleStateChange}
              />
            )}
          </form.Field>

          <form.Field
            name="city"
            validators={{
              onChange: ({ value }) => (!value ? 'City is required' : undefined)
            }}
          >
            {(field) => (
              <SelectInput
                disabled={isViewCompany}
                label="City"
                field={field}
                options={cities}
                placeholder="Select City"
                onChange={handleCityChange}
              />
            )}
          </form.Field>

          <form.Field
            name="pincode"
            validators={{
              onChange: ({ value }) => {
                if (!/^\d+$/.test(value)) return 'Pincode must be numeric';
                if (value.length !== 6) return 'Pincode must be 6 digits long';
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                type="text"
                label="Pincode"
                field={field}
              />
            )}
          </form.Field>
        </div>
      </CardWrapper>

      <CardWrapper>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <form.Field
            name="websiteUrl"
            validators={{
              onChange: ({ value }) => {
                try {
                  new URL(value);
                } catch {
                  return 'Invalid URL';
                }
                return undefined;
              }
            }}
          >
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="Website URL"
                field={field}
              />
            )}
          </form.Field>

          <form.Field name="gstNumber">
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="GST Number"
                field={field}
              />
            )}
          </form.Field>

          <form.Field name="cinNumber">
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="CIN Number"
                field={field}
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
        {!isViewCompany && (
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        )}
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
