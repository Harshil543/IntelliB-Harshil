'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTenant } from '@/services/tenant.service';
import tenantColumn from '@/utils/tableColumn/tenant.column';
import Loader from '@/components/CommonComponents/Loader';

export default function TenantPage() {
  const { status, data } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenant
  });

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <DataTable
        columns={tenantColumn}
        data={[]}
        path="/tenant/register-tenant"
      />
    );
  }

  return (
    <div>
      <DataTable
        columns={tenantColumn}
        data={data}
        path="/tenant/register-tenant"
      />
    </div>
  );
}
