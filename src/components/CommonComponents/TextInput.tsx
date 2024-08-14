// components/TextInput.tsx
import React from "react";
import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TextInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  placeholder = `Enter ${name}`,
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Field name={name}>
        {({ field }: any) => (
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            required
          />
        )}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm"
      />
    </div>
  );
};

export default TextInput;
