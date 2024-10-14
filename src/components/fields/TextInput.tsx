// components/TextInput.tsx

import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
  label: string;
  field: any;
  type?: any;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  value?: string | number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  field,
  type = 'text',
  placeholder = `${label}`,
  disabled,
  required = true,
  onChange,
  value
}) => {
  const handleChange = (value: string) => {
    const newValue = type === 'number' ? Number(value) : value;
    field.handleChange(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>
        {label}
        {label ? (
          <span className="text-md pl-1 text-red-500">
            {required ? '*' : ''}
          </span>
        ) : null}
      </Label>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        required={required}
        placeholder={placeholder}
        value={field.state.value || value}
        onBlur={field.handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        className="h-10 rounded-lg border-border"
        disabled={disabled}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-sm text-red-600">
          {field.state.meta.errors.join(', ')}
        </span>
      ) : null}
    </div>
  );
};

export default TextInput;
