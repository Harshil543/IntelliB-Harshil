import React, { useEffect, useState } from 'react';
import CardWrapper from '../layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCompany, updateCompany } from '@/services/company.service';
import toast from 'react-hot-toast';
import PhoneInputField from '../fields/PhoneInput';
import { Country, State, City } from 'country-state-city';
import SelectInput from '@components/fields/SelectInput';

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
  status?: string; // Adding status if used in the form
}

interface CompanyFormProps {
  initialValues?: CompanyFormValues;
}

export default function CompanyForm({ initialValues }: CompanyFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const isViewCompany = pathname.includes('view-company');

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
    mutationFn: async (data: CompanyFormValues) => {
      if (initialValues?.id) {
        return await updateCompany({
          payload: data,
          id: initialValues.id
        });
      } else {
        return await createCompany({ payload: data });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['company'] });
      router.push('/company/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
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
      status: 'Active'
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync(values);
    }
  });

  const handleCountryChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
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
    setCities([]); // Clear cities when country changes
  };

  const handleStateChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    const stateCode = selectedOption ? selectedOption.value : '';

    const cityList = City.getCitiesOfState(
      form.getFieldValue('country'),
      stateCode
    ).map(({ name }) => ({
      value: name,
      label: name
    }));
    setCities(cityList);
    form.setFieldValue('city', '');
  };

  const handleCityChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    const cityName = selectedOption ? selectedOption.value : '';
    form.setFieldValue('city', cityName);
  };

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
          <form.Field
            name="addressLine1"
            validators={{
              onChange: ({ value }) =>
                !value ? 'Address Line 1 is required' : undefined
            }}
          >
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="Address Line 1"
                field={field}
              />
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
                if (!value) return 'Pincode is required';
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
                if (!value) return 'Website URL is required';
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

          <form.Field
            name="gstNumber"
            validators={{
              onChange: ({ value }) =>
                !value ? 'GST Number is required' : undefined
            }}
          >
            {(field) => (
              <TextInput
                disabled={isViewCompany}
                label="GST Number"
                field={field}
              />
            )}
          </form.Field>

          <form.Field
            name="cinNumber"
            validators={{
              onChange: ({ value }) =>
                !value ? 'CIN Number is required' : undefined
            }}
          >
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

      <div className="col-span-full mt-10 flex justify-end space-x-4">
        <Button
          type="button"
          className="text-dark w-fit bg-secondary hover:bg-opacity-80 hover:text-background"
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
