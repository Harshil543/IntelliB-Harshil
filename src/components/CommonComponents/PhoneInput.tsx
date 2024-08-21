import React from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import PhoneNumber from 'awesome-phonenumber';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface PhoneInputProps {
  name: string;
  label: string;
  placeholder?: string;
  country?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  name,
  label,
  placeholder = `Enter ${label}`,
  country = 'IN'
}) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pn = new PhoneNumber(e.target.value, { regionCode: country });
    if (pn.isValid()) {
      setValue(pn.getNumber('e164'));
    } else {
      setValue(e.target.value);
    }
  };

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: any) => (
          <Input
            {...field}
            id={name}
            type={'number'}
            placeholder={placeholder}
            required
            style={{
              borderColor: 'var(--border)',
              borderRadius: '4px'
            }}
            className="h-10"
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-sm text-red-600"
      />
    </div>
  );
};

export default PhoneInput;
