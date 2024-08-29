import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputFieldProps {
  label: string;
  field: {
    value: string;
    countryCode: string;
    setValue: (value: string) => void;
    setCountryCode: (value: string) => void;
    errorMessage?: string;
  };
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({ label, field }) => {
  const { value, countryCode, setValue, setCountryCode, errorMessage } = field;

  const concatenatedValue = `${countryCode}${value}`;

  const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
    const trimmedPhoneNumber = phone.slice(country.dialCode.length);

    setValue(trimmedPhoneNumber);
    setCountryCode(country.dialCode);
  };

  return (
    <div className="form-group w-full">
      <label className="form-label">{label}</label>
      <PhoneInput
        country={'in'}
        value={concatenatedValue}
        onChange={handlePhoneChange}
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
