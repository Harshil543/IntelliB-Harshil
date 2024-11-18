import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Label } from '../ui/label';

interface PhoneInputFieldProps {
  label: string;
  disabled: boolean;
  required?: boolean;
  field: {
    value: string;
    countryCode: string;
    setValue: (value: string) => void;
    setCountryCode: (value: string) => void;
    errorMessage?: string;
  };
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  label,
  field,
  disabled,
  required = true
}) => {
  const { value, countryCode, setValue, setCountryCode, errorMessage } = field;

  const [localError, setLocalError] = useState<string | undefined>(
    errorMessage
  );

  // Concatenate country code and value to show in the PhoneInput
  const concatenatedValue = `${countryCode}${value}`;

  // Handle change in phone number and country code
  const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
    // Remove the dial code from the phone input and set the country code
    const trimmedPhoneNumber = phone.slice(country.dialCode.length);

    setValue(trimmedPhoneNumber);
    setCountryCode(country.dialCode);

    // Validate phone number after change
    if (country.dialCode === '91') {
      validatePhoneNumber(trimmedPhoneNumber);
    }
  };

  // Validate phone number length (for India, it should be exactly 10 digits)
  const validatePhoneNumber = (phone: string) => {
    if (phone.length !== 10) {
      setLocalError('Phone number must be exactly 10 digits for India');
    } else {
      setLocalError(undefined);
    }
  };

  useEffect(() => {
    // Perform validation when the component mounts or the value changes
    if (value && countryCode === '+91') {
      validatePhoneNumber(value);
    }
  }, [value, countryCode]);

  return (
    <div className="grid gap-2">
      <Label className="form-label">
        {label}
        <span className="text-md pl-1 text-red-500">{required ? '*' : ''}</span>
      </Label>
      <PhoneInput
        country={'in'} // Default to India
        value={concatenatedValue} // Pass the concatenated value to PhoneInput
        onChange={handlePhoneChange} // Use the updated handlePhoneChange function
        disabled={disabled}
        inputStyle={{
          width: '100%',
          borderRadius: '4px',
          borderColor: '#ccc',
          height: '2.5rem',
          backgroundColor: 'transparent'
        }}
      />

      {/* Display error messages */}
      {(localError || errorMessage) && (
        <span className="text-red-500">{localError || errorMessage}</span>
      )}
    </div>
  );
};

export default PhoneInputField;

// import React from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { Label } from '../ui/label';

// interface PhoneInputFieldProps {
//   label: string;
//   disabled: boolean;
//   required?: boolean;
//   field: {
//     value: string;
//     countryCode: string;
//     setValue: (value: string) => void;
//     setCountryCode: (value: string) => void;
//     errorMessage?: string;
//   };
// }

// const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
//   label,
//   field,
//   disabled,
//   required = true
// }) => {
//   const { value, countryCode, setValue, setCountryCode, errorMessage } = field;

//   const concatenatedValue = `${countryCode}${value}`;

//   const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
//     const trimmedPhoneNumber = phone.slice(country.dialCode.length);

//     setValue(trimmedPhoneNumber);
//     setCountryCode(country.dialCode);
//   };

//   return (
//     <div className="grid gap-2">
//       <Label className="form-label">
//         {label}{' '}
//         <span className="text-md pl-1 text-red-500">{required ? '*' : ''}</span>
//       </Label>
//       <PhoneInput
//         country={'in'}
//         value={concatenatedValue}
//         onChange={handlePhoneChange}
//         disabled={disabled}
//         inputStyle={{
//           width: '100%',
//           borderRadius: '4px',
//           borderColor: '#ccc',
//           height: '2.5rem',
//           backgroundColor: 'transparent'
//         }}
//       />
//       {errorMessage && <span className="text-red-500">{errorMessage}</span>}
//     </div>
//   );
// };

// export default PhoneInputField;
