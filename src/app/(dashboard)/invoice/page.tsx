'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import tenantColumn from '@/utils/tableColumn/tenant.column';
import { getInvoice } from '@/services/invoice.service';

export default function InvoicePage() {
  const { status, data, error } = useQuery({
    queryKey: ['invoice'],
    queryFn: getInvoice
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
        columns={tenantColumn}
        data={data}
        path="/tenants/register-tenant"
      />
    </div>
  );
}
