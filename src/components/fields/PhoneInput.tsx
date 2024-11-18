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

  // This is the value to be displayed in the phone input field (including country code)
  const concatenatedValue = `${countryCode}${value}`;

  // Validation: Check if the phone number has exactly 10 digits (after removing country code)
  const validatePhoneNumber = (phone: string) => {
    const phoneNumberWithoutCountryCode = phone.slice(countryCode.length);
    if (phoneNumberWithoutCountryCode.length !== 10) {
      setLocalError('Phone number must be exactly 10 digits.');
    } else {
      setLocalError(undefined);
    }
  };

  const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
    const trimmedPhoneNumber = phone.slice(country.dialCode.length);

    setValue(trimmedPhoneNumber);
    setCountryCode(country.dialCode);

    // Validate the phone number every time it changes
    validatePhoneNumber(phone);
  };

  // Set the default country to India if no country code is selected
  useEffect(() => {
    if (!countryCode) {
      setCountryCode('IN'); // Default country code is India
    }
  }, [countryCode, setCountryCode]);

  return (
    <div className="grid gap-2">
      <Label className="form-label">
        {label}{' '}
        <span className="text-md pl-1 text-red-500">{required ? '*' : ''}</span>
      </Label>
      <PhoneInput
        country={'in'}
        value={concatenatedValue}
        onChange={handlePhoneChange}
        disabled={disabled}
        inputStyle={{
          width: '100%',
          borderRadius: '4px',
          borderColor: '#ccc',
          height: '2.5rem',
          backgroundColor: 'transparent'
        }}
      />
      {localError && <span className="text-red-500">{localError}</span>}
      {errorMessage && !localError && (
        <span className="text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default PhoneInputField;
