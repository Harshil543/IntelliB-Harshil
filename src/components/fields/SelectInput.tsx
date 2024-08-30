// components/SelectInput.tsx

import React from 'react';
import type { FieldApi } from '@tanstack/react-form';
import Select from 'react-select';
import { Label } from '@/components/ui/label';

interface Option {
  value: string; // Ensure value is a string
  label: string;
}

interface SelectInputProps {
  label: string;
  field: FieldApi<any, any, any, any>;
  options: Option[];
  placeholder?: string;
  disabled: boolean;
  onChange?: (selectedOption: Option | null) => void; // Add onChange prop
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  field,
  options,
  placeholder = `Select ${label}`,
  disabled,
  onChange // Destructure onChange
}) => {
  // Find the selected option based on the current field value
  const selectedOption = options.find(
    (option) => option.value === field.state.value
  );

  const handleChange = (option: Option | null) => {
    field.handleChange(option ? option.value : '');
    if (onChange) onChange(option); // Call onChange if it exists
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Select
        id={field.name}
        name={field.name}
        options={options}
        placeholder={placeholder}
        value={selectedOption || null}
        onChange={handleChange}
        onBlur={() => field.handleBlur()}
        isSearchable
        isDisabled={disabled}
        getOptionLabel={(option: Option) => option.label}
        getOptionValue={(option: Option) => option.value}
        aria-live="off"
        styles={{
          container: (provided: any) => ({
            ...provided,
            border: '1px solid var(--border)',
            borderRadius: '6px',
            backgroundColor: 'transparent'
          }),
          control: (provided: any) => ({
            ...provided,
            border: '0px',
            boxShadow: 'none',
            backgroundColor: 'transparent',
            fontSize: '14px'
          }),
          singleValue: (provided: any) => ({
            ...provided,
            color: '#000'
          }),
          menu: (provided: any) => ({
            ...provided,
            borderRadius: '4px',
            border: '1px solid var(--border)',
            backgroundColor: 'white',
            zIndex: 1000,
            position: 'absolute',
            marginTop: '4px'
          }),
          menuList: (provided: any) => ({
            ...provided,
            backgroundColor: 'white'
          })
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

export default SelectInput;
