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
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['meter-reading', page, searchQuery, limit],
    queryFn: () => getMeterReading(page, searchQuery, limit),
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
        columns={MeterReadingColumn}
        path="/meter-reading/register-meter-reading"
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
        handleLimitChange={handleLimitChange}
        limit={limit}
      />
    </div>
  );
}
