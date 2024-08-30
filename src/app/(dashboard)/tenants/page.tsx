'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import { DataTable } from '@/components/CommonComponents/Table';
import React from 'react';
import Heading from '@/components/CommonComponents/Heading';
import companyColumns from '@/utils/tableColumn/company.column';
import { useQuery } from '@tanstack/react-query';
import { getCompany } from '@/services/company.service';
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
      <BreadcrumbWithCustomSeparator />
      <Heading children="Tenant" />
      <DataTable
        columns={tenantColumn}
        data={data}
        path="/tenants/register-tenant"
      />
    </div>
  );
}
