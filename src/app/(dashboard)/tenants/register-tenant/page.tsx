'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';
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
