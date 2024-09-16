'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getpropertyCoAdminById } from '@/services/property-co-admin.service';
import PropertyCoAdminForm from '@/components/forms/property-co-admin.form';
import Loader from '@/components/CommonComponents/Loader';

export default function PropertyCoAdminUpdate() {
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['property-co-admin', id],
    queryFn: () => getpropertyCoAdminById(Number(id))
  });
  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <div>
      <PropertyCoAdminForm initialValues={data} />
    </div>
  );
}
