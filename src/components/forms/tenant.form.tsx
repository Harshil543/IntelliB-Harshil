// components/TenantForm.tsx
'use client';

import React, { useEffect, useState } from 'react';
import CardWrapper from '@components/layout/CardWrapper';
import { Button } from '@/components/ui/button';
import TextInput from '@/components/fields/TextInput';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Heading from '../fields/Heading';
import SelectInput from '../fields/SelectInput';
import DatePickerInput from '../fields/DatePickerInput';
import {
  createLeasableUnitData,
  createTenantBillingData,
  createTenantData,
  updateLeasableUnitData,
  updateTenantBillingData
} from '@/services/tenant.service';
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
    // leasedUnit: string;
    // leasedStartDate: string;
    // leasedEndDate: string;
    // bilingMethod: string;
    // bilingType: string;
    // bilingCycle: string;
    // limit: string;
  };
}

export const TenantDataForm = ({
  initialValues,
  companyIdByUpdate
}: TenantFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isViewTenant = pathname.includes('view-tenant');

  const [selectedCountry, setSelectedCountry] = useState<OptionType | null>(
    null
  );
  // const [selectedState, setSelectedState] = useState<OptionType | null>(null);

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
        // company: {
        //   ...data.value.company,
        //   country: selectedCountry?.label || '',
        //   state: selectedState?.label || ''
        // }
      };

      // Uncomment below to handle API calls:
      if (initialValues?.id) {
        // return await updateTenantData(initialValues?.id, updatedData?.value);
      } else {
        return await createTenantData(updatedData?.value);
      }
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
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

  const handleCountryChange = (selectedOption: OptionType | null) => {
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

  const handleStateChange = (selectedOption: OptionType | null) => {
    // setSelectedState(selectedOption);
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

  const handleCityChange = (selectedOption: OptionType | null) => {
    form.setFieldValue('company.city', selectedOption?.label || '');
  };

  return (
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

          <form.Field name="company.mobileNumber">
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

          <form.Field name="company.addressLine2">
            {(field) => (
              <TextInput
                disabled={isViewTenant}
                label="Address Line 2"
                field={field}
              />
            )}
          </form.Field>

          <form.Field name="company.country">
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

          <form.Field name="company.state">
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

          <form.Field name="company.city">
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

          <form.Field name="company.pincode">
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
              <TextInput label="Email" field={field} disabled={isViewTenant} />
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
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        )}
      </div>
      <CardWrapper>
        <Heading className="mt-5">Lease Data</Heading>
        <LeasaForm />
      </CardWrapper>
    </form>
  );
};

export const TenantLeasableForm = ({ initialValues }: TenantFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isViewTenant = pathname.includes('view-tenant');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return updateLeasableUnitData({
          id: initialValues.id,
          payload: data
        });
      } else {
        return createLeasableUnitData(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant'] });
      router.push('/tenant/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      leasedUnit: '',
      leasedStartDate: '',
      leasedEndDate: '',
      status: 'Active'
    },
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
    }
  });

  return (
    <CardWrapper>
      <Heading>Leased Unit Data</Heading>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <form.Field
          name="leasedUnit"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Leased Unit is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              label="Leased Unit"
              field={field}
              options={[
                { value: '567', label: '567' },
                { value: '679', label: '679' },
                { value: '567', label: '567' }
              ]}
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="leasedStartDate"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Leased start date is required' : undefined
          }}
        >
          {(field) => (
            <DatePickerInput
              label="Start Date"
              field={field}
              placeholder="Select a date"
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="leasedEndDate"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Leased end date is required' : undefined
          }}
        >
          {(field) => (
            <DatePickerInput
              label="End Date"
              field={field}
              placeholder="Select a date"
              disabled={isViewTenant}
            />
          )}
        </form.Field>
      </div>
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
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        )}
      </div>
    </CardWrapper>
  );
};

export const TenantBillingForm = ({ initialValues }: TenantFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const isViewTenant = pathname.includes('view-tenant');

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (initialValues?.id) {
        return updateTenantBillingData({
          id: initialValues.id,
          payload: data
        });
      } else {
        return createTenantBillingData(data);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant'] });
      router.push('/tenants/');
      toast.success(`${initialValues?.id ? 'Updated' : 'Added'} successfully`);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    }
  });

  const form = useForm({
    defaultValues: initialValues || {
      bilingMethod: '',
      bilingType: '',
      bilingCycle: '',
      limit: '',
      status: 'Active'
    },
    onSubmit: async (values: any) => {
      await mutation.mutateAsync(values);
    }
  });

  return (
    <CardWrapper>
      <Heading>Billing Data</Heading>
      <div className="my-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <form.Field
          name="bilingMethod"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Biling Method is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              label="Biling Method"
              field={field}
              options={[
                { value: '567', label: '567' },
                { value: '679', label: '679' },
                { value: '567', label: '567' }
              ]}
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="bilingType"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Biling Type is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              label="Biling Type"
              field={field}
              options={[
                { value: '567', label: '567' },
                { value: '679', label: '679' },
                { value: '567', label: '567' }
              ]}
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="bilingCycle"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Biling Cycle is required' : undefined
          }}
        >
          {(field) => (
            <SelectInput
              label="Biling Cycle"
              field={field}
              options={[
                { value: '567', label: '567' },
                { value: '679', label: '679' },
                { value: '567', label: '567' }
              ]}
              disabled={isViewTenant}
            />
          )}
        </form.Field>
        <form.Field
          name="limit"
          validators={{
            onChange: ({ value }) => (!value ? 'Limit is required' : undefined)
          }}
        >
          {(field) => (
            <TextInput label="Limit" field={field} disabled={isViewTenant} />
          )}
        </form.Field>
      </div>
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
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? 'Submitting...' : 'Submit'}
              </Button>
            )}
          </form.Subscribe>
        )}
      </div>
    </CardWrapper>
  );
};

{
  /* <div className="col-span-full mt-10 flex justify-start space-x-4">
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
</div>  */
}
