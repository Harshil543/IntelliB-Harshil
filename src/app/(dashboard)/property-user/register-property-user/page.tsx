'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import PropertyUserForm from '@/components/forms/property-user.form';

export default function PropertyUserRegister() {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Property User" />
      <PropertyUserForm />
    </div>
  );
}
