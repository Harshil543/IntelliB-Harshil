'use client';

import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import { DataTable } from '@/components/CommonComponents/Table';
import React from 'react';
import Heading from '@/components/CommonComponents/Heading';
import { useQuery } from '@tanstack/react-query';
import { getPropertyUser } from '@/services/property-user.service';
import propertyUserColumns from '@/utils/tableColumn/property-user.column';

export default function PropertyUserPage() {
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
      <BreadcrumbWithCustomSeparator />
      <Heading children="Property User" />
      <DataTable
        columns={propertyUserColumns}
        data={data}
        path="/property-user/register-property-user/"
      />
    </div>
  );
}
