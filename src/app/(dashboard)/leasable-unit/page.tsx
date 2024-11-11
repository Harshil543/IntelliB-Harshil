'use client';

import { DataTable } from '@/components/fields/Table';
import React, { useState } from 'react';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
  downloadTemplate,
  getLeasableUnit,
  importData
} from '@/services/leasable-unit.service';
import leasableUnitColumn from '@/utils/tableColumn/leasable-unit.column';
import Loader from '@/components/CommonComponents/Loader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

export default function LeasableUnit() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [limit, setLimit] = useState<number>(10);

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['leasable-unit', page, searchQuery, limit],
    queryFn: () => getLeasableUnit(page, searchQuery, limit),
    placeholderData: keepPreviousData
  });

  const mutation = useMutation({
    mutationFn: importData,
    onSuccess: () => {
      toast.success('Data imported successfully!');
      refetch();
    },
    onError: (error: any) => {
      toast.error(`Error importing data: ${error.message}`);
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
      link.download = 'leasable_unit_template.xlsx';
      link.click();
    } catch (error) {
      console.error('Error downloading template:', error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    mutation.mutate(formData);
  };

  const triggerFileInput = () => {
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    fileInput?.click();
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
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" size="sm" onClick={triggerFileInput}>
                  Import Data
                </Button>
              </label>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />
    </div>
  );
}
