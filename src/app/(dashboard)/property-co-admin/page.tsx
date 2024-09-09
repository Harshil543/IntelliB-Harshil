'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import propertyCoAdminColumns from '@/utils/tableColumn/property-co-admin.column';
import { getPropertyCoAdmin } from '@/services/property-co-admin.service';
import Loader from '@/components/CommonComponents/Loader';

export default function PropertyCoAdminPage() {
  const { status, data } = useQuery({
    queryKey: ['property-co-admin'],
    queryFn: getPropertyCoAdmin
  });

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <DataTable
        columns={propertyCoAdminColumns}
        data={[]}
        path="/property-co-admin/register-property-co-admin/"
      />
    );
  }

  return (
    <div>
      <DataTable
        columns={propertyCoAdminColumns}
        data={data}
        path="/property-co-admin/register-property-co-admin/"
      />
    </div>
  );
}
