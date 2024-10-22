'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getTenant } from '@/services/tenant.service';
import tenantColumn from '@/utils/tableColumn/tenant.column';
import Loader from '@/components/CommonComponents/Loader';

export default function TenantPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isError, data } = useQuery({
    queryKey: ['tenant', page, searchQuery, limit],
    queryFn: () => getTenant(page, searchQuery, limit),
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
        columns={tenantColumn}
        path="/tenant/register-tenant"
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
