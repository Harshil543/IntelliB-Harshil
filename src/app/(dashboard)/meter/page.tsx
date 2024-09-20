'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import meterColumn from '@/utils/tableColumn/meter.column';
import { getMeter } from '@/services/meter.service';
import Loader from '@/components/CommonComponents/Loader';

export default function Meter() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { status, isError, data } = useQuery({
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

  if (status === 'pending') {
    return <Loader />;
  }

  return (
    <div>
      <DataTable
        columns={meterColumn}
        path="/meter/register-meter"
        data={isError ? [] : []}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
      />
    </div>
  );
}
