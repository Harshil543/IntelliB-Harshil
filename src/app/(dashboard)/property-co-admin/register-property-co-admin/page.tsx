'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';
import PropertyCoAdminForm from '@/components/forms/property-co-admin.form';

export default function PropertyCoAdminRegister() {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Property Co-Admin" />
      <PropertyCoAdminForm />
    </div>
  );
}
