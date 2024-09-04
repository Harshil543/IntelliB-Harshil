'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { getTenantById } from '@/services/tenant.service';
import TenantForm from '@/components/forms/tenant.form';
import { useQuery } from '@tanstack/react-query';

export default function TenantView() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['tenant', id],
    queryFn: () => getTenantById(Number(id))
  });

  return (
    <div>
      <TenantForm initialValues={data} />
    </div>
  );
}
