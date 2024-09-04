'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getpropertyCoAdminById } from '@/services/property-co-admin.service';
import PropertyCoAdminForm from '@/components/forms/property-co-admin.form';

export default function PropertyCoAdminView() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['property-co-admin', id],
    queryFn: () => getpropertyCoAdminById(Number(id))
  });

  return (
    <div>
      <PropertyCoAdminForm initialValues={data} />
    </div>
  );
}
