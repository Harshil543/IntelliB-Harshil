'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';
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

  console.log('data==>', data);

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Tenant" />
      <TenantForm initialValues={data} />
    </div>
  );
}
