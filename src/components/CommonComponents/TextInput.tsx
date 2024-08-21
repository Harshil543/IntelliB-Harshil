// components/TextInput.tsx
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = 'text',
  placeholder = `Enter ${label}`
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: any) => (
          <Input
            {...field}
            id={name}
            type={type}
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

export default TextInput;
