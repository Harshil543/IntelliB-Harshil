'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getTenantDataById } from '@/services/tenant.service';
import { TenantDataForm } from '@/components/forms/tenant.form';

export default function TenantUpdate() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['tenant', id],
    queryFn: () => getTenantDataById(Number(id))
  });

  return (
    <div>
      <TenantDataForm
        initialValues={data}
        companyIdByUpdate={data?.company?.id}
      />
    </div>
  );
}
