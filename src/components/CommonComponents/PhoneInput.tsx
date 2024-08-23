import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputFieldProps {
  label: string;
  field: any;
}

const PhoneInputField: React.FC<PhoneInputFieldProps> = ({ label, field }) => {
  const { value, setValue, errorMessage } = field;

  const handlePhoneChange = (phone: string, country: { dialCode: string }) => {
    const trimmedPhoneNumber = phone.slice(country.dialCode.length);

    setValue(trimmedPhoneNumber);
    // setPhoneNumber(trimmedPhoneNumber);
    // setCountryCode(country.dialCode);
  };
  return (
    <div className="form-group w-full">
      <label className="form-label">{label}</label>
      <PhoneInput
        country={'in'}
        value={value}
        // onChange={(phone: string) => setValue(phone)}
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
