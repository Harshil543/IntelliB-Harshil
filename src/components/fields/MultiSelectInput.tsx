import React from 'react';
import type { FieldApi } from '@tanstack/react-form';
import Select from 'react-select';
import { Label } from '@/components/ui/label';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectInputProps {
  label: string;
  field: FieldApi<any, any, any, any>;
  options: Option[];
  placeholder?: string;
  disabled: boolean;
  onChange?: (selectedOptions: Option[] | null) => void; // Adjust onChange prop for multiple selections
}

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  label,
  field,
  options,
  placeholder = `Select ${label}`,
  disabled,
  onChange
}) => {
  // Find the selected options based on the current field value
  const selectedOptions = options.filter((option) =>
    field.state.value.includes(option.value)
  );

  const handleChange = (selectedOptions: Option[] | null) => {
    const values = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    field.handleChange(values);
    if (onChange) onChange(selectedOptions); // Call onChange if it exists
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <Select
        id={field.name}
        name={field.name}
        options={options}
        placeholder={placeholder}
        value={selectedOptions}
        onChange={handleChange}
        onBlur={() => field.handleBlur()}
        isSearchable
        isMulti
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

export default MultiSelectInput;
