'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import companyColumns from '@/utils/tableColumn/company.column';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCompany } from '@/services/company.service';
import Loader from '@/components/CommonComponents/Loader';

export default function ComapnyPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['company', page, searchQuery, limit],
    queryFn: () => getCompany(page, searchQuery, limit),
    placeholderData: keepPreviousData
  });

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    setPage(1);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable
        columns={companyColumns}
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
        path="/company/register-company"
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
        handleLimitChange={handleLimitChange}
        limit={limit}
        isUseImport={true}
      />
    </div>
  );
}
