// components/TextInput.tsx

import React from 'react';
import type { FieldApi } from '@tanstack/react-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface TextInputProps {
  label: string;
  field: FieldApi<any, any, any, any>;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  field,
  type = 'text',
  placeholder = `${label}`
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        required
        style={{
          borderColor: 'var(--border)',
          borderRadius: '4px'
        }}
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
