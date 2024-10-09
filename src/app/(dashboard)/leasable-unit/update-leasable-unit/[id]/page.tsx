'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getLeasableUnitById } from '@/services/leasable-unit.service';
import LeasableUnitForm from '@/components/forms/leasable-unit.form';
import Loader from '@/components/CommonComponents/Loader';

export default function LeasableUnitUpdate() {
  const { id } = useParams();

  const {
    data: leasableData,
    isLoading: isLoadingLeasable,
    isError: isErrorLeasable
  } = useQuery({
    queryKey: ['leasable-unit', id],
    queryFn: () => getLeasableUnitById(Number(id)),
    placeholderData: keepPreviousData
  });

  if (isLoadingLeasable || status === 'pending') {
    return <Loader />;
  }

  if (isErrorLeasable) {
    return <div>Error loading leasable unit data</div>;
  }

  return <LeasableUnitForm initialValues={leasableData} />;
}
