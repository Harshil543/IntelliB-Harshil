'use client';
import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import propertyUserColumns from '@/utils/tableColumn/property-user.column';
import { getPropertyUser } from '@/services/property-user.service';
import Loader from '@/components/CommonComponents/Loader';

export default function PropertyCoAdminPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['property-co-admin', page, searchQuery],
    queryFn: () => getPropertyUser(page, searchQuery),
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
        columns={propertyUserColumns}
        path="/property-user/register-property-user/"
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
      />
    </div>
  );
}
