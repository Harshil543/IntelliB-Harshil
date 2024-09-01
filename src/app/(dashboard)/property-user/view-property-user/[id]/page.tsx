'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/fields/BreadCrumb';
import Heading from '@/components/fields/Heading';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getpropertyUserById } from '@/services/property-user.service';
import PropertyUserForm from '@/components/forms/property-user.form';

export default function PropertyUserVie() {
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: ['property-user', id],
    queryFn: () => getpropertyUserById(Number(id))
  });

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Property User" />
      <PropertyUserForm initialValues={data} />
    </div>
  );
}
