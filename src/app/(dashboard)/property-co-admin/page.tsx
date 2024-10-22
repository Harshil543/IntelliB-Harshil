'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import propertyCoAdminColumns from '@/utils/tableColumn/property-co-admin.column';
import { getPropertyCoAdmin } from '@/services/property-co-admin.service';
import Loader from '@/components/CommonComponents/Loader';

export default function PropertyCoAdminPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['property-co-admin', page, searchQuery, limit],
    queryFn: () => getPropertyCoAdmin(page, searchQuery, limit),
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
    <DataTable
      columns={propertyCoAdminColumns}
      data={isError ? [] : data?.items}
      path="/property-co-admin/register-property-co-admin/"
      pagination={data?.pagination}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      onSearch={handleSearch}
      handleLimitChange={handleLimitChange}
      limit={limit}
      isUseImport={true}
    />
  );
}
