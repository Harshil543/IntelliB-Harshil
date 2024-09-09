import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Label } from '@/components/ui/label';

interface DatePickerInputProps {
  label: string;
  field: any;
  placeholder?: string;
  disabled: boolean;
}

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  label,
  field,
  placeholder,
  disabled
}) => {
  const handleChange = (date: Date | null) => {
    field.setValue(date); // Update field value
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <DatePicker
        disabled={disabled}
        id={field.name}
        selected={field.state.value || null}
        onChange={handleChange}
        placeholderText={placeholder}
        className={`mt-1 h-10 w-full rounded-lg border border-border px-3 text-sm shadow-sm`}
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-sm text-red-600">
          {field.state.meta.errors.join(', ')}
        </span>
      ) : null}
    </div>
  );
};

export default DatePickerInput;
