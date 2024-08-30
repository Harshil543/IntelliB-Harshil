'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import { DataTable } from '@/components/fields/Table';
import React from 'react';
import Heading from '@/components/fields/Heading';
import { useQuery } from '@tanstack/react-query';
import propertyCoAdminColumns from '@/utils/tableColumn/property-co-admin.column';
import { getPropertyCoAdmin } from '@/services/property-co-admin.service';

export default function PropertyCoAdminPage() {
  const { status, data, error } = useQuery({
    queryKey: ['property-co-admin'],
    queryFn: getPropertyCoAdmin
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
      <Heading children="Property Co-Admin" />
      <DataTable
        columns={propertyCoAdminColumns}
        data={data}
        path="/property-co-admin/register-property-co-admin/"
      />
    </div>
  );
}
