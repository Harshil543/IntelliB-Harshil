import React from 'react';
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

  const concatenatedValue = `${countryCode}${value}`;

  const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
    const trimmedPhoneNumber = phone.slice(country.dialCode.length);

    setValue(trimmedPhoneNumber);
    setCountryCode(country.dialCode);
  };

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
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default PhoneInputField;
