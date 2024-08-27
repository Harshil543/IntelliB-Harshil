import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputFieldProps {
  label: string;
  value: string;
  countryCode: string;
  onChange: (value: string, country: { dialCode: string }) => void;
  errorMessage?: string;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  label,
  value,
  countryCode,
  onChange,
  errorMessage
}) => {
  const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
    const trimmedPhoneNumber = phone.slice(country.dialCode.length);
    onChange(trimmedPhoneNumber, country);
  };

  return (
    <div className="form-group w-full">
      <label className="form-label">{label}</label>
      <PhoneInput
        country={'in'}
        value={countryCode + value}
        onChange={handlePhoneChange}
        inputStyle={{
          width: '100%',
          borderRadius: '4px',
          borderColor: '#ccc',
          height: '2.5rem'
        }}
      />
      {errorMessage && <span className="text-red-500">{errorMessage}</span>}
    </div>
  );
};

export default PhoneInputField;
