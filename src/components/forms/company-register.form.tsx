// components/CompanyRegisterForm.tsx

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { useForm } from '@tanstack/react-form';
import PhoneInputField from '@components/fields/PhoneInput';
import { Country, State, City } from 'country-state-city';
import SelectInput from '@components/fields/SelectInput';

interface FormValues {
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
  status: string;
}

const CompanyRegisterForm: React.FC = () => {
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

  const form = useForm<FormValues>({
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
      cinNumber: '',
      status: 'Active'
    },
    onSubmit: async (values) => {
      console.log('Form Submitted ', values);
    }
  });

  const handleCountryChange = (selectedOption: any) => {
    const countryCode = selectedOption ? selectedOption.value : '';

    const stateList = State.getStatesOfCountry(countryCode).map(
      ({ isoCode, name }) => ({
        value: isoCode,
        label: name
      })
    );

    setStates(stateList);
    form.setFieldValue('state', '');
    form.setFieldValue('city', '');
  };

  const handleStateChange = (selectedOption: any) => {
    const stateCode = selectedOption ? selectedOption.value : '';
    console.log('Selected State Code:', stateCode);

    const cityList = City.getCitiesOfState(
      form.getFieldValue('country'),
      stateCode
    ).map(({ name }) => ({
      value: name,
      label: name
    }));

    setCities(cityList);
  };

  const handleCityChange = (selectedOption: any) => {
    const cityName = selectedOption ? selectedOption.value : '';

    // Set the selected city value to the form field
    form.setFieldValue('city', cityName);
  };

  return (
    <form
      onSubmit={form.handleSubmit}
      className="grid w-full grid-cols-1 gap-4"
    >
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
          <TextInput disabled={false} label="Company Name" field={field} />
        )}
      </form.Field>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
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
              disabled={false}
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
              disabled={false}
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <form.Field
          name="addressLine1"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Address Line 1 is required' : undefined
          }}
        >
          {(field) => (
            <TextInput disabled={false} label="Address Line 1" field={field} />
          )}
        </form.Field>

        <form.Field
          name="addressLine2"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Address Line 2 is required' : undefined
          }}
        >
          {(field) => (
            <TextInput disabled={false} label="Address Line 2" field={field} />
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
              disabled={false}
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
            onChange: ({ value }) => (!value ? 'State is required' : undefined)
          }}
        >
          {(field) => (
            <SelectInput
              disabled={false}
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
              disabled={false}
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
              if (!value) return 'Pincode is required';
              if (!/^\d+$/.test(value)) return 'Pincode must be numeric';
              if (value.length !== 6) return 'Pincode must be 6 digits long';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              disabled={false}
              type="text"
              label="Pincode"
              field={field}
            />
          )}
        </form.Field>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
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
        >
          {(field) => (
            <TextInput disabled={false} label="Website URL" field={field} />
          )}
        </form.Field>

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
        >
          {(field) => (
            <TextInput disabled={false} label="GST Number" field={field} />
          )}
        </form.Field>

        <form.Field
          name="cinNumber"
          validators={{
            onChange: ({ value }) => {
              if (!value) return 'CIN Number is required';
              const cinRegex = /^[LU][0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;
              if (!cinRegex.test(value))
                return 'Invalid CIN Number (should be 21 characters long and in the correct format)';
              return undefined;
            }
          }}
        >
          {(field) => (
            <TextInput
              disabled={false}
              type="text"
              label="CIN Number"
              field={field}
            />
          )}
        </form.Field>
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-[40%] bg-primary"
          >
            {isSubmitting ? 'Submitting...' : 'Update'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
};

export default CompanyRegisterForm;
