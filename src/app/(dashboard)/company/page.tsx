'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import { DataTable } from '@/components/CommonComponents/Table';
import React from 'react';
import Heading from '@/components/CommonComponents/Heading';
import companyColumns from '@/utils/tableColumn/company.column';
import { useQuery } from '@tanstack/react-query';
import { getCompany } from '@/services/company.service';
import { useRouter } from 'next/navigation';

export default function ComapnyPage() {
  const { status, data, error } = useQuery({
    queryKey: ['company'],
    queryFn: getCompany
  });

  if (status === 'pending') {
    return <span>Loading...</span>;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Company" />
      <DataTable
        columns={companyColumns}
        data={data}
        path="/company/register-company"
      />
    </div>
  );
}
