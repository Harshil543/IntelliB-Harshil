'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getLeasableUnit } from '@/services/leasable-unit.service';
import leasableUnitColumn from '@/utils/tableColumn/leasable-unit.column';

export default function LeasableUnit() {
  const { status, data, error } = useQuery({
    queryKey: ['leasable-unit'],
    queryFn: getLeasableUnit
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
        columns={leasableUnitColumn}
        data={data}
        path="/leasable-unit/register-leasable-unit"
      />
    </div>
  );
}
