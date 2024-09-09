'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getLeasableUnit } from '@/services/leasable-unit.service';
import leasableUnitColumn from '@/utils/tableColumn/leasable-unit.column';
import Loader from '@/components/CommonComponents/Loader';

export default function LeasableUnit() {
  const { status, data } = useQuery({
    queryKey: ['leasable-unit'],
    queryFn: getLeasableUnit
  });

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return (
      <DataTable
        columns={leasableUnitColumn}
        data={[]}
        path="/leasable-unit/register-leasable-unit"
      />
    );
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
