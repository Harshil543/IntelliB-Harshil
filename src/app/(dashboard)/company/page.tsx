'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';

import companyColumns from '@/utils/tableColumn/company.column';
import { useQuery } from '@tanstack/react-query';
import { getCompany } from '@/services/company.service';

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
      <DataTable
        columns={companyColumns}
        data={data}
        path="/company/register-company"
      />
    </div>
  );
}
