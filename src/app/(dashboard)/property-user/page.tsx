'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import propertyUserColumns from '@/utils/tableColumn/property-user.column';
import { getPropertyUser } from '@/services/property-user.service';

export default function PropertyCoAdminPage() {
  const { status, data, error } = useQuery({
    queryKey: ['property-user'],
    queryFn: getPropertyUser
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
        columns={propertyUserColumns}
        data={data}
        path="/property-co-admin/register-property-co-admin/"
      />
    </div>
  );
}
