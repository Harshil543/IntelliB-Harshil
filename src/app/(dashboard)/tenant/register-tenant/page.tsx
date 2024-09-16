'use client';

import {
  TenantBillingForm,
  TenantDataForm,
  TenantLeasableForm
} from '@/components/forms/tenant.form';
import * as React from 'react';

export default function TenantRegister() {
  return (
    <div>
      <TenantDataForm />
      <TenantLeasableForm />
      <TenantBillingForm />
    </div>
  );
}
