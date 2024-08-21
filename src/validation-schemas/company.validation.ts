import * as Yup from 'yup';

const companyvalidationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is required'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  addressLine2: Yup.string().optional(), // Optional field
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  country: Yup.string().required('Country is required'),
  pincode: Yup.string()
    .matches(/^[0-9]{5,6}$/, 'Pincode must be 5 or 6 digits')
    .required('Pincode is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  countryCode: Yup.string()
    .matches(/^\+\d{1,3}$/, 'Country Code must be a valid format (e.g., +1)')
    .required('Country Code is required'),
  mobileNumber: Yup.string()
    .nullable()
    .matches(/^\d{10}$/, 'Mobile Number must be 10 digits')
    .required('Mobile Number is required'),
});

export default companyvalidationSchema;
