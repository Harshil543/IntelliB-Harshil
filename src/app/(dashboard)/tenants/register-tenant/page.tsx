'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import TenantForm from '@/components/forms/tenant.form';

export default function TenantRegister() {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Tenant" />
      <TenantForm />
    </div>
  );
}
