'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import companyColumns from '@/utils/tableColumn/company.column';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCompany } from '@/services/company.service';
import Loader from '@/components/CommonComponents/Loader';

export default function ComapnyPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['company', page],
    queryFn: () => getCompany(page),
    placeholderData: keepPreviousData
  });

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <DataTable
        columns={companyColumns}
        data={[]}
        path="/company/register-company"
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    );
  }

  return (
    <div>
      <DataTable
        columns={companyColumns}
        data={data}
        path="/company/register-company"
        handleNext={handleNext}
        handlePrevious={handlePrevious}
      />
    </div>
  );
}
