// Invoice.tsx
'use client';

import Loader from '@/components/CommonComponents/Loader';
import { DataTable } from '@/components/fields/Table';
import { getInvoice } from '@/services/invoice.service';
import invoiceColumn from '@/utils/tableColumn/invoice.column';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const TenantBills = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['audit-trails', page, searchQuery, limit],
    queryFn: () => getInvoice(page, searchQuery, limit),
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
      columns={invoiceColumn}
      path=""
      data={isError ? [] : data?.items}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      onSearch={handleSearch}
      handleLimitChange={handleLimitChange}
      limit={limit}
      searchKey="By Invoice Number"
      addButton={<></>}
    />
  );
};

export default TenantBills;
