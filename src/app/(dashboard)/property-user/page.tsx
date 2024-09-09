'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import propertyUserColumns from '@/utils/tableColumn/property-user.column';
import { getPropertyUser } from '@/services/property-user.service';
import Loader from '@/components/CommonComponents/Loader';

export default function PropertyCoAdminPage() {
  const { status, data } = useQuery({
    queryKey: ['property-user'],
    queryFn: getPropertyUser
  });

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <DataTable
        columns={propertyUserColumns}
        data={[]}
        path="/property-co-admin/register-property-co-admin/"
      />
    );
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
