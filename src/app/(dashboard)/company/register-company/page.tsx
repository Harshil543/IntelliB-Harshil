'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';

import CompanyForm from '@/components/forms/company.form';

export default function CompanyRegister() {
  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Company" />
      <CompanyForm />
    </div>
  );
}
