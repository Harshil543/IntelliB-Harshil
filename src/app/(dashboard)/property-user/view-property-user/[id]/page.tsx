'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getPropertyUserById } from '@/services/property-user.service';
import PropertyUserForm from '@/components/forms/property-user.form';

export default function PropertyUserVie() {
  const { id } = useParams();
  const { data } = useQuery({
    queryKey: ['property-user', id],
    queryFn: () => getPropertyUserById(Number(id))
  });

  return (
    <div>
      <PropertyUserForm initialValues={data} />
    </div>
  );
}
