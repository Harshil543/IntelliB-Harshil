// components/TimePickerInput.tsx
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import type { FieldApi } from '@tanstack/react-form';
import { Label } from '@/components/ui/label';

interface TimePickerInputProps {
  label: string;
  field: FieldApi<any, any, any, any>;
  placeholder?: string;
  disabled?: boolean;
  showTimeSelectOnly?: boolean; // Optional prop to allow date-time picker
}

const TimePickerInput: React.FC<TimePickerInputProps> = ({
  label,
  field,
  placeholder,
  disabled = false,
  showTimeSelectOnly = true
}) => {
  const handleChange = (time: Date | null) => {
    field.setValue(time); // Update field value
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor={field.name}>{label}</Label>
      <DatePicker
        disabled={disabled}
        id={field.name}
        selected={(field.state.value && new Date(field.state.value)) || null}
        onChange={handleChange}
        placeholderText={placeholder}
        className={`mt-1 h-10 w-full rounded-lg border border-border px-3 text-sm shadow-sm`}
        showTimeSelect
        showTimeSelectOnly={showTimeSelectOnly}
        timeIntervals={15} // Set time intervals (e.g., 15 minutes)
        timeCaption="Time"
        dateFormat="h:mm aa" // Format the time (e.g., 03:45 PM)
      />
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <span className="text-sm text-red-600">
          {field.state.meta.errors.join(', ')}
        </span>
      ) : null}
    </div>
  );
};

export default TimePickerInput;
