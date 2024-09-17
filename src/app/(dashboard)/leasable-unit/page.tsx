'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getLeasableUnit } from '@/services/leasable-unit.service';
import leasableUnitColumn from '@/utils/tableColumn/leasable-unit.column';
import Loader from '@/components/CommonComponents/Loader';

export default function LeasableUnit() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['leasable-unit', page, searchQuery],
    queryFn: () => getLeasableUnit(page, searchQuery),
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
        columns={leasableUnitColumn}
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
