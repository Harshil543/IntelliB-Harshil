'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useQuery, useMutation } from '@tanstack/react-query';
import Loader from '@/components/CommonComponents/Loader';
import {
  downloadTemplate,
  getMeterReading,
  importData
} from '@/services/meter-reading.service';
import MeterReadingColumn from '@/utils/tableColumn/meter-reading.column';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';

type MeterReadingData = {
  meterId: number;
  readingDate: Date;
  readingValue: number;
  payload: any;
};

export default function MeterReadingList() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['meter-reading', page, searchQuery, limit],
    queryFn: () => getMeterReading(page, searchQuery, limit),
    placeholderData: keepPreviousData
  });

  const mutation = useMutation({
    mutationFn: importData,
    onSuccess: () => {
      alert('Data imported successfully!');
      refetch();
    },
    onError: (error: any) => {
      alert(`Error importing data: ${error.message}`);
    }
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

  const handleDownloadTemplate = async () => {
    try {
      const response = await downloadTemplate();
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'meter_reading_template.xlsx';
      link.click();
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: MeterReadingData[] = XLSX.utils.sheet_to_json(worksheet);

      console.log('Parsed JSON data from file:', jsonData); // Log the parsed data

      // Ensure the jsonData matches the expected structure before mutating
      mutation.mutate(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <DataTable
        columns={MeterReadingColumn}
        path="/meter-reading/register-meter-reading"
        data={isError ? [] : data?.items}
        pagination={data?.pagination}
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        onSearch={handleSearch}
        handleLimitChange={handleLimitChange}
        limit={limit}
        compo={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Import
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-20 bg-white p-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTemplate}
              >
                Download Template
              </Button>
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className=""
                  id="file-upload"
                />

                <Button variant="outline" size="sm">
                  Import Data
                </Button>
              </label>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
      {mutation.isPending ? <Loader /> : null}
    </div>
  );
}
