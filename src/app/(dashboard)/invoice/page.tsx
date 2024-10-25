// Invoice.tsx
'use client';
interface InvoiceData {
  id: number; // Keep as number
  userName: string;
  property: string;
  unit: number;
  billingDate: Date;
  endDate: Date;
  amount: number;
  status: string;
}
import Loader from '@/components/CommonComponents/Loader';
import { DataTable } from '@/components/fields/Table';
import { getInvoice } from '@/services/invoice.service';
import invoiceColumn from '@/utils/tableColumn/invoice.column';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

const Invoice = () => {
  const items: InvoiceData[] = [
    {
      id: 78787,
      userName: 'user1',
      property: 'Property 1',
      unit: 10,
      billingDate: new Date('2024-10-10'),
      endDate: new Date('2024-10-20'),
      amount: 1000,
      status: 'paid'
    },
    {
      id: 78788,
      userName: 'user2',
      property: 'Property 2',
      unit: 10,
      billingDate: new Date('2024-10-10'),
      endDate: new Date('2024-10-20'),
      amount: 1200,
      status: 'unpaid'
    }
  ];

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { data, isLoading } = useQuery({
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
    <DataTable
      columns={invoiceColumn}
      path=""
      // data={isError ? items : data?.items}
      data={items ? items : data?.items}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      onSearch={handleSearch}
      handleLimitChange={handleLimitChange}
      limit={limit}
    />
  );
};

export default Invoice;
