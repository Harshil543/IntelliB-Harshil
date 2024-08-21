// components/SelectInput.tsx
import React from 'react';
import { Field, ErrorMessage, useField } from 'formik';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';

const Select = dynamic(() => import('react-select'), { ssr: false });

interface Option {
  name: number;
  label: string;
  id: number;
}

interface SelectInputProps {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  options,
  placeholder = `Select ${label}`
}) => {
  const [field, meta, helpers] = useField(name);

  const selectedOption = options.find((option) => option.value === field.value);

  const formattedOptions = options.map((option) => ({
    ...option,
    value: option.value
  }));

  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      border: `1px solid ${color?.textSecondaryColor}`,
      borderRadius: '4px',
      backgroundColor: 'transparent',
      position: 'relative'
    }),
    control: (provided: any) => ({
      ...provided,
      border: `0px solid ${color?.textSecondaryColor}`,
      boxShadow: 'none',
      backgroundColor: 'transparent'
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#000'
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '4px',
      border: `1px solid ${color?.textSecondaryColor}`,
      backgroundColor: 'white',
      zIndex: 1000,
      position: 'absolute',
      marginTop: '4px'
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: 'white'
    })
  };

  const handleChange = (option: Option | null) => {
    helpers.setValue(option ? (option as Option).id : '');
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: any) => (
          <Select
            {...field}
            id={name}
            options={formattedOptions}
            placeholder={placeholder}
            value={selectedOption}
            onChange={handleChange}
            onBlur={() => helpers.setTouched(true)}
            isSearchable
            getOptionLabel={(option: Option) => option.label}
            getOptionValue={(option: Option) => option.name.toString()}
            aria-live="off"
            styles={customStyles}
            className="text-sm"
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

export default SelectInput;
