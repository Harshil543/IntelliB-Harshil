'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import Loader from '@/components/CommonComponents/Loader';
import meterColumn from '@/utils/tableColumn/meter.column';
import { getMeter } from '@/services/meter.service';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function Meter() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['meter', page, searchQuery],
    queryFn: () => getMeter(page, searchQuery),
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable
        columns={meterColumn}
        path="/leasable-unit/register-leasable-unit"
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
      />
    </div>
  );
}
