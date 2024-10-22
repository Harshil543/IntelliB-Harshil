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
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['leasable-unit', page, searchQuery, limit],
    queryFn: () => getLeasableUnit(page, searchQuery, limit),
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
        columns={leasableUnitColumn}
        path="/leasable-unit/register-leasable-unit"
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
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
