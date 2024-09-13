import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { Label } from '@/components/ui/label';

interface Option {
  value: string; // Ensure value is a string
  label: string;
}

interface SelectInputProps {
  label: string;
  value: string;
  field: any;
  options: Option[];
  placeholder?: string;
  disabled: boolean;
  onChange?: (selectedOption: Option | null) => void; // Add onChange prop
}

const customStyles: StylesConfig<Option, false> = {
  container: (provided) => ({
    ...provided,
    border: '1px solid var(--border)',
    borderRadius: '6px',
    backgroundColor: 'transparent'
  }),
  control: (provided) => ({
    ...provided,
    border: '0px',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px'
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#000'
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: '4px',
    border: '1px solid var(--border)',
    backgroundColor: 'white',
    zIndex: 1000,
    position: 'absolute',
    marginTop: '4px'
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: 'white'
  }),
  // Add the placeholder style
  placeholder: (provided) => ({
    ...provided,
    color: 'var(--muted-foreground)' // Use CSS variable for muted color
  })
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  field,
  options,
  value,
  placeholder = `Select ${label}`,
  disabled,
  onChange
}) => {
  const selectedOption = options.find(
    (option) => option.value === field.state.value
  );

  const handleChange = (option: Option | null) => {
    field.handleChange(option ? option.value : '');
    if (onChange) onChange(option);
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
        inputValue={value}
        isDisabled={disabled}
        getOptionLabel={(option: Option) => option.label}
        getOptionValue={(option: Option) => option.value}
        aria-live="off"
        styles={customStyles}
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
