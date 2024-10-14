import React from 'react';
import Select, { StylesConfig } from 'react-select';
import { Label } from '@/components/ui/label';

interface Option {
  value: string | number;
  label: string | number;
}

interface SelectInputProps {
  label: string | number;
  field: any;
  options: Option[];
  required?: true;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (selectedOption: Option | null) => void;
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
    color: '#000',
    textTransform: 'capitalize'
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
    backgroundColor: 'white',
    textTransform: 'capitalize'
  }),

  placeholder: (provided) => ({
    ...provided,
    color: 'var(--muted-foreground)'
  })
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  field,
  options,
  placeholder = `Select ${label}`,
  required = true,
  disabled,
  onChange
}) => {
  const selectedOption = options.find(
    (option) => option.label === field.state.value
  );

  const handleChange = (option: Option | null) => {
    field.handleChange(option ? option.value : '');
    if (onChange) onChange(option);
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>
        {label}{' '}
        <span className="text-md pl-1 text-red-500">{required ? '*' : ''}</span>
      </Label>
      <Select
        id={field.name}
        name={field.name}
        options={options}
        placeholder={placeholder}
        value={selectedOption || null}
        onChange={handleChange}
        onBlur={() => field.handleBlur()}
        required={required}
        isSearchable
        isDisabled={disabled}
        getOptionLabel={(option: Option) => String(option.label)}
        getOptionValue={(option: Option) => String(option.value)}
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
