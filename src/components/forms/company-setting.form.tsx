'use client';
import React, { useEffect, useState } from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import SelectInput from '../fields/SelectInput';
import { getUser, updateUser } from '@/services/user.service';
import toast from 'react-hot-toast';
import PhoneInputField from '../fields/PhoneInput';
import Loader from '../CommonComponents/Loader';
import { useRouter } from 'next/navigation';
import { City, Country, State } from 'country-state-city';
import SelectInput from '../fields/SelectInput';

interface OptionType {
  value: string;
  label: string;
}

export default function CompanySettingForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );
  const [countries, setCountries] = useState<OptionType[]>([]);
  const [states, setStates] = useState<OptionType[]>([]);
  const [cities, setCities] = useState<OptionType[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return updateUser({
        payload: data
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success(`Company Updated successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: {
      salutation: data?.data?.salutation,
      firstName: data?.data?.firstName,
      lastName: data?.data?.lastName,
      email: data?.data?.email,
      mobileNumber: data?.data?.mobileNumber,
      countryCode: data?.data?.countryCode,
      designation: data?.data?.designation,
      company: {
        companyName: data?.data?.company?.companyName,
        propertyName: data?.data?.company?.propertyName,
        addressLine1: data?.data?.company?.addressLine1,
        addressLine2: data?.data?.company?.addressLine2,
        city: data?.data?.company?.city,
        state: data?.data?.company?.state,
        country: data?.data?.company?.country,
        pincode: data?.data?.company?.pincode,
        email: data?.data?.company?.email,
        countryCode: data?.data?.company?.countryCode,
        mobileNumber: data?.data?.company?.mobileNumber,
        websiteUrl: data?.data?.company?.websiteUrl,
        gstNumber: data?.data?.company?.gstNumber,
        cinNumber: data?.data?.company?.cinNumber,
        companyLogo: data?.data?.company?.companyLogo
      }
    },
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
    }
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
    const countryList = Country.getAllCountries().map(({ isoCode, name }) => ({
      value: isoCode,
      label: name
    }));
    setCountries(countryList);
  }, []);

  useEffect(() => {
    if (data?.data) {
      // Set the selected country
      const countryOption = countries.find(
        (country) => country.label === data?.data.company.country
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
          (state) => state.label === data?.data.company.state
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
  }, [data?.data, countries]);

  if (isLoading) {
    return <Loader />;
  }

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
            name="company.companyName"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Company name is required';
                if (value.length < 3)
                  return 'Company name must be at least 3 characters';
                return undefined;
              }
            }}
          >
            {(field) => <TextInput label="Company Name " field={field} />}
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
            {(field) => <TextInput type="email" label="Email" field={field} />}
          </form.Field>

          <form.Field
            name="company.mobileNumber"
            validators={{
              onChange: ({ value }) => {
                if (!value) return 'Mobile Number is required';
                return undefined;
              }
            }}
          >
            {(field) => (
              <PhoneInputField
                label="Mobile Number"
                disabled={false}
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

          <form.Field name="company.addressLine1">
            {(field) => (
              <TextInput
                label="Address Line 1"
                field={field}
                required={false}
              />
            )}
          </form.Field>

          <form.Field name="company.addressLine2">
            {(field) => (
              <TextInput
                label="Address Line 2"
                field={field}
                required={false}
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
              onChange: ({ value }) => (!value ? 'City is required' : undefined)
            }}
          >
            {(field) => (
              <SelectInput
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
              onChange: ({ value }) => {
                if (!/^\d+$/.test(value)) return 'Pincode must be numeric';
                if (value.length !== 6) return 'Pincode must be 6 digits long';
                return undefined;
              }
            }}
          >
            {(field) => <TextInput type="text" label="Pincode" field={field} />}
          </form.Field>

          <form.Field
            name="company.websiteUrl"
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
              <TextInput label="Website URL" field={field} required={false} />
            )}
          </form.Field>

          <form.Field name="company.gstNumber">
            {(field) => (
              <TextInput required={false} label="GST Number" field={field} />
            )}
          </form.Field>

          <form.Field name="company.cinNumber">
            {(field) => (
              <TextInput label="CIN Number" field={field} required={false} />
            )}
          </form.Field>

          <form.Field name="company.propertyName">
            {(field) => (
              <TextInput label="Property Name" field={field} required={false} />
            )}
          </form.Field>
        </div>
      </CardWrapper>

      <div className="col-span-full my-10 flex justify-start space-x-4">
        <Button
          type="button"
          className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
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
