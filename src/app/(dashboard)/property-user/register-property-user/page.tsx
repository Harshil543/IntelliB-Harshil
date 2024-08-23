'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';

import PropertyUserForm from '@/components/forms/propertyUserForm';

export default function PropertyUserRegister() {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Property User" />
      <PropertyUserForm />
    </div>
  );
}
