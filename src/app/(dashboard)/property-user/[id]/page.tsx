'use client';

import * as React from 'react';
import { BreadcrumbWithCustomSeparator } from '@/components/CommonComponents/BreadCrumb';
import Heading from '@/components/CommonComponents/Heading';

import CompanyForm from '@/components/forms/company.form';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getCompanyById } from '@/services/company.service';
import { getpropertyUserById } from '@/services/property-user.service';
import PropertyUserForm from '@/components/forms/propertyUserForm';

export default function PropertyUserUpdate() {
  const { id } = useParams();
  const { status, data, error } = useQuery({
    queryKey: ['property-user', id],
    queryFn: () => getpropertyUserById(Number(id))
  });

  return (
    <div>
      <BreadcrumbWithCustomSeparator />
      <Heading children="Company" />
      <PropertyUserForm initialValues={data} />
    </div>
  );
}
