// src/app/(dashboard)/meter/MeterList.tsx
'use client';

import { DataTable } from '@/components/fields/Table';
import React from 'react';
import meterColumn from '@/utils/tableColumn/meter.column';

interface MeterListProps {
  addButton?: React.ReactNode;
  isError: Boolean;
  data: any;
  handleNext: () => void;
  handlePrevious: () => void;
  handleSearch: (query: string) => void;
  handleLimitChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  limit: number;
}

const MeterList = ({
  addButton,
  isError,
  data,
  handleNext,
  handlePrevious,
  handleSearch,
  handleLimitChange,
  limit
}: MeterListProps) => {
  return (
    <div>
      <DataTable
        columns={meterColumn}
        path=""
        data={isError ? [] : data}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
        addButton={addButton}
        isUseExport={false}
        handleLimitChange={handleLimitChange}
        limit={limit}
      />
    </div>
  );
};

export default MeterList;
