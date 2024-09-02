'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getLeasableUnitById } from '@/services/leasable-unit.service';
import LeasableUnitForm from '@/components/forms/leasable-unit.form';

export default function LeasableUnitUpdate() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['leasable-unit', id],
    queryFn: () => getLeasableUnitById(Number(id))
  });

  return (
    <div>
      <LeasableUnitForm initialValues={data} />
    </div>
  );
}
