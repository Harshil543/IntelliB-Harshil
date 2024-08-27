'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';

import CompanyForm from '@/components/forms/company.form';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '@/services/company.service';

export default function CompanyUpdate() {
  const { id } = useParams(); // Get the ID from URL
  const { status, data, error } = useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompanyById(Number(id))
  });

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Company" />
      <CompanyForm initialValues={data} />
    </div>
  );
}
