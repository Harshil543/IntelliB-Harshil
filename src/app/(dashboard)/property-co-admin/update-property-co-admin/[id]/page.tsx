'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getpropertyCoAdminById } from '@/services/property-co-admin.service';
import PropertyCoAdminForm from '@/components/forms/property-co-admin.form';

export default function PropertyCoAdminUpdate() {
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: ['property-co-admin', id],
    queryFn: () => getpropertyCoAdminById(Number(id))
  });

  return (
    <div>
      <PropertyCoAdminForm initialValues={data} />
    </div>
  );
}
