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

import { DataTable } from '@/components/fields/Table';
import invoiceColumn from '@/utils/tableColumn/invoice.column';
import React from 'react';

const Invoice = () => {
  // Sample data structured as an array
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

  const handlePrevious = () => {
    console.log('Previous page');
  };

  const handleNext = () => {
    console.log('Next page');
  };

  const handleSearch = () => {
    console.log('Search term:');
  };

  return (
    <DataTable
      columns={invoiceColumn}
      path=""
      data={items}
      handleNext={handleNext}
      handlePrevious={handlePrevious}
      onSearch={handleSearch}
    />
  );
};

export default Invoice;
