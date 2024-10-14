// components/fields/FileUpload.tsx

import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import Image from 'next/image';

interface FileUploadProps {
  label: string;
  field: any;
  accept?: string;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  field,
  accept,
  disabled
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      field.handleChange(files);
      const previewUrl = URL.createObjectURL(files[0]);
      setImagePreview(previewUrl);
    } else {
      field.handleChange(null);
      setImagePreview(null);
    }
  };

  return (
    <div className="flex gap-2">
      <div>
        {' '}
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          id={field.name}
          name={field.name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          onBlur={field.handleBlur}
          className="h-10 rounded-lg border-border"
          disabled={disabled}
        />
        {field.state.meta.isTouched && field.state.meta.errors.length > 0 && (
          <span className="text-sm text-red-600">
            {field.state.meta.errors.join(', ')}
          </span>
        )}
      </div>
      <div>
        {imagePreview && (
          <div className="relative mt-2 h-14 w-14">
            <Image
              src={imagePreview}
              alt="Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
