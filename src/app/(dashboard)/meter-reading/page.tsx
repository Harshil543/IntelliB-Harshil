'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Loader from '@/components/CommonComponents/Loader';
import { getMeterReading } from '@/services/meter-reading.service';
import MeterReadingColumn from '@/utils/tableColumn/meter-reading.column';

export default function MeterReadingList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['meter-reading', page, searchQuery],
    queryFn: () => getMeterReading(page, searchQuery),
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
        columns={MeterReadingColumn}
        path="/meter-reading/register-meter-reading"
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
      />
    </div>
  );
}
