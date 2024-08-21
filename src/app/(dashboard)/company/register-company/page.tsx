'use client';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import CardWrapper from '@/components/CommonComponents/CardWrapper';
import Heading from '@/components/CommonComponents/Heading';
import PhoneInput from '@/components/CommonComponents/PhoneInput';
import TextInput from '@/components/CommonComponents/TextInput';
import { Button } from '@/components/ui/button';

import companyvalidationSchema from '@/validation-schemas/company.validation';
import { Form, Formik } from 'formik';

export default function CompanyRegister() {
  const options = [
    { name: 'option1', label: 'Option 1', id: 1 },
    { name: 'option2', label: 'Option 2', id: 2 },
    { name: 'option3', label: 'Option 3', id: 3 }
  ];
  const initialValues = {
    companyName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    email: '',
    countryCode: '',
    mobileNumber: ''
  };
  const handleSubmit = async (values: typeof initialValues) => {
    console.log('values', values);
  };
  return (
    <>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Company" />

      <CardWrapper>
        <Formik
          initialValues={initialValues}
          validationSchema={companyvalidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <TextInput
                  label="Company Name"
                  name="companyName"
                  type="text"
                />
                <TextInput
                  label="Address Line 1"
                  name="addressLine1"
                  type="text"
                />
                <TextInput
                  label="Address Line 2"
                  name="addressLine2"
                  type="text"
                />
                <TextInput label="City" name="city" type="text" />
                <TextInput label="State" name="state" type="text" />
                <TextInput label="Country" name="country" type="text" />
                <TextInput label="Pincode" name="pincode" type="number" />
                <TextInput label="Email" name="email" type="email" />
                <TextInput
                  label="Country Code"
                  name="countryCode"
                  type="number"
                />
                <PhoneInput
                  label="Mobile Number"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="col-span-full mt-10 flex space-x-4">
                <Button
                  type="button"
                  className={`text-dark w-fit bg-secondary hover:bg-opacity-80 hover:text-background`}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className={`w-fit text-background hover:bg-opacity-80`}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardWrapper>
    </>
  );
}
