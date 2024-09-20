'use client';
import * as React from 'react';
import CompanyForm from '@/components/forms/company.form';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '@/services/company.service';
import Loader from '@/components/CommonComponents/Loader';

export default function CompanyUpdate() {
  const { id } = useParams();
  const { data, status } = useQuery({
    queryKey: ['company', id],
    queryFn: () => getCompanyById(Number(id))
  });

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <div>
      <CompanyForm initialValues={data} />
    </div>
  );
}
