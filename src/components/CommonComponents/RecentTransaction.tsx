'use client';

import Loader from '@/components/CommonComponents/Loader';
import { DataTable } from '@/components/fields/Table';
import { getInvoice } from '@/services/invoice.service';
import invoiceColumn from '@/utils/tableColumn/invoice.column';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const RecentTransaction = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(5);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['invoice'],
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
    // <Card className="col-span-4">
    //   <CardHeader className="flex flex-row justify-between">
    //     <CardTitle>Recent Payments</CardTitle>
    //     <CardTitle className="cursor-pointer rounded-full bg-secondary px-5 py-1 text-xs font-medium">
    //       See All
    //     </CardTitle>
    //   </CardHeader>
    //   <CardContent className="pl-2">
    //     {paymentHistory?.map((item, i) => (
    //       <TransactionCard item={item} key={i} />
    //     ))}
    //   </CardContent>
    // </Card>
    <DataTable
      columns={invoiceColumn}
      path=""
      data={isError ? [] : data?.items}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      onSearch={handleSearch}
      handleLimitChange={handleLimitChange}
      limit={limit}
      addButton={<></>}
      isUseExport={false}
      isSearch={false}
      isPagination={false}
    />
  );
};

export default RecentTransaction;
