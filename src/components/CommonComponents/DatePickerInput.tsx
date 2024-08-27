// // components/CommonComponents/DatePickerInput.tsx
// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { useField, useFormikContext } from 'formik';

// interface DatePickerInputProps {
//   label: string;
//   name: string;
//   placeholder?: string;
// }

// const DatePickerInput: React.FC<DatePickerInputProps> = ({
//   label,
//   name,
//   placeholder
// }) => {
//   const { setFieldValue } = useFormikContext();
//   const [field, meta] = useField(name);

//   return (
//     <div className="form-group w-full">
//       <label htmlFor={name} className="block text-sm font-medium">
//         {label}
//       </label>
//       <DatePicker
//         id={name}
//         selected={(field.value && new Date(field.value)) || null}
//         onChange={(date) => setFieldValue(name, date)}
//         placeholderText={placeholder}
//         className={`rounded-md mt-1 h-10 w-full border px-5 text-sm shadow-sm ${meta.touched && meta.error ? 'border-red-500' : 'border-black'}`}
//       />
//       {meta.touched && meta.error ? (
//         <div className="mt-1 w-full text-sm text-red-500">{meta.error}</div>
//       ) : null}
//     </div>
//   );
// };

// export default DatePickerInput;
