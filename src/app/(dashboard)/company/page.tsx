'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';

import companyColumns from '@/utils/tableColumn/company.column';
import { useQuery } from '@tanstack/react-query';
import { getCompany } from '@/services/company.service';
import Loader from '@/components/CommonComponents/Loader';

export default function ComapnyPage() {
  const { status, data } = useQuery({
    queryKey: ['company'],
    queryFn: getCompany
  });

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <DataTable
        columns={companyColumns}
        data={[]}
        path="/company/register-company"
      />
    );
  }

  return (
    <div>
      <DataTable
        columns={companyColumns}
        data={data}
        path="/company/register-company"
      />
    </div>
  );
}
