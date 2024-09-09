'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import meterColumn from '@/utils/tableColumn/meter.column';
import { getMeter } from '@/services/meter.service';
import Loader from '@/components/CommonComponents/Loader';

export default function LeasableUnit() {
  const { status, data, error } = useQuery({
    queryKey: ['meter'],
    queryFn: getMeter
  });

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <DataTable
        columns={meterColumn}
        data={data}
        path="/meter/register-meter"
      />
    </div>
  );
}
