'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import PropertyUserForm from '@/components/forms/property-user.form';
import { getPropertyUserById } from '@/services/property-user.service';
import Loader from '@/components/CommonComponents/Loader';


export default function PropertyUser() {
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['property-user', id],
    queryFn: () => getPropertyUserById(Number(id))
  });

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <div>
      <PropertyUserForm initialValues={data} />
    </div>
  );
}
