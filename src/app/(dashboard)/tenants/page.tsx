'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTenant } from '@/services/tenant.service';
import tenantColumn from '@/utils/tableColumn/tenant.column';

export default function TenantPage() {
  const { status, data, error } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenant
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
