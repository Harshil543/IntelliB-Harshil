'use client';
import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { usePathname, useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { utils, writeFile } from 'xlsx';
import { saveAs } from 'file-saver';
import autoTable from 'jspdf-autotable';

type Pagination = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  path: string;
  addButton?: React.ReactNode;
  pagination?: Pagination;
  limit?: number;
  handleNext: () => void;
  handlePrevious: () => void;
  handleLimitChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  compo?: React.ReactNode;
  onSearch: (query: string) => void;
  isUseExport?: boolean;
  isSearch?: boolean;
  isPagination?: boolean;
  searchKey?: string;
};

export function DataTable<T>({
  columns,
  data,
  pagination,
  searchKey,
  addButton,
  path,
  limit,
  handleNext,
  handlePrevious,
  handleLimitChange,
  compo,
  onSearch,
  isSearch = true,
  isPagination = true,
  isUseExport = true
}: DataTableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const initialPagination: Pagination = {
    totalItems: 0,
    currentPage: 1,
    totalPages: 1
  };

  const [paginationState, setPaginationState] = React.useState<Pagination>(
    pagination || initialPagination
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: paginationState.currentPage - 1,
        pageSize: limit || 10
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        setPaginationState(paginationState);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    filterFns: {
      globalFilter: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes(filterValue.toLowerCase());
      }
    }
  });

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  // Function to export as CSV
  const exportCSV = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    const rows = selectedRows.length
      ? selectedRows.map((row) => row.original)
      : data;

    // Filter columns to exclude unwanted ones
    const filteredColumns = columns.filter(
      (column) =>
        column.id !== 'select' &&
        column.id !== 'serialNumber' &&
        column.id !== 'actions'
    );

    // Prepare CSV headers and rows
    const headers = filteredColumns.map((col) => col.header as string);
    const rowsData = rows.map((row: any) =>
      filteredColumns.map((col: any) => {
        const accessor = col.accessorKey;
        return getNestedValue(row, accessor) || 'N/A'; // Provide 'N/A' if undefined
      })
    );

    // Convert to CSV format
    const csvContent = [
      headers.join(','), // Add headers to CSV
      ...rowsData.map((row) => row.join(',')) // Add each row data
    ].join('\n');

    // Trigger CSV file download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${pathname.split('/')[1]}.csv`);
  };

  const exportXLSX = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    const rows = selectedRows.length
      ? selectedRows.map((row) => row.original)
      : data;

    // Filter columns to exclude unwanted ones
    const filteredColumns = columns.filter(
      (column) =>
        column.id !== 'select' &&
        column.id !== 'serialNumber' &&
        column.id !== 'actions'
    );

    // Prepare headers and rows for XLSX
    const headers = filteredColumns.map((col) => col.header as string);
    const rowsData = rows.map((row: any) =>
      filteredColumns.map((col: any) => {
        const accessor = col.accessorKey;
        return getNestedValue(row, accessor) || 'N/A'; // Provide 'N/A' if undefined
      })
    );

    // Create a worksheet and workbook using xlsx utils
    const ws = utils.aoa_to_sheet([headers, ...rowsData]);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');

    // Trigger XLSX file download
    writeFile(wb, `${pathname.split('/')[1]}.xlsx`);
  };

  const exportPDF = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    const rows = selectedRows.length
      ? selectedRows.map((row) => row.original)
      : data;

    const doc = new jsPDF();
    doc.text(`${pathname.split('/')[1].toUpperCase()} DATA`, 20, 10);

    // Filter columns to exclude unwanted ones like 'select' and 'serialNumber'
    const filteredColumns = columns.filter(
      (column) =>
        column.id !== 'select' &&
        column.id !== 'serialNumber' &&
        column.id !== 'actions'
    );

    // Prepare table headers from column definitions
    const tableColumn = filteredColumns.map((col) => col.header as string);

    // Prepare table rows by handling nested data
    const tableRows = rows.map((row: any) =>
      filteredColumns.map((col: any) => {
        const accessor = col.accessorKey;

        // Check if the accessor is a nested object, and extract the relevant field
        const value = getNestedValue(row, accessor);
        console.log(`Fetching value for accessor ${accessor}:`, value);

        return value || 'N/A'; // Provide a default value in case it's undefined
      })
    );

    // Generate the table in the PDF document
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'striped',
      styles: { halign: 'center' },
      margin: { top: 20 }
    });

    // Save the generated PDF
    doc.save(`${pathname.split('/')[1]}.pdf`);
  };

  // Helper function to get nested values dynamically
  const getNestedValue = (obj: any, path: string) => {
    const keys = path && path.split('.');
    if (!keys || !keys.length) return '';

    // Debug log to see the keys being processed
    console.log('Navigating path:', keys);

    // Reduce the object to extract the value based on the path
    const value = keys.reduce((acc, key) => {
      if (acc && acc[key] !== undefined) {
        return acc[key];
      }

      return undefined; // Return undefined if key doesn't exist
    }, obj);

    return value ?? 'N/A'; // Return 'N/A' if value is undefined or null
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 py-4 sm:flex-wrap md:flex-nowrap">
        {isSearch ? (
          <Input
            placeholder={` ${searchKey ? `Search ${searchKey} ` : 'Search...'}`}
            className="w-full rounded-3xl border-border bg-background"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        ) : null}
        <div className="flex items-center space-x-2">
          {isUseExport ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Button onClick={exportCSV} variant="outline" size="sm">
                  Export CSV
                </Button>
                <Button onClick={exportXLSX} variant="outline" size="sm">
                  Export XLSX
                </Button>
                <Button onClick={exportPDF} variant="outline" size="sm">
                  Export PDF
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
          {compo}
        </div>
        {addButton ? (
          addButton
        ) : (
          <Button onClick={() => handleNavigate(path)}>Add</Button>
        )}
      </div>
      <div className={`rounded-lg border bg-background`}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isPagination ? (
        <div className="flex flex-wrap items-center justify-between py-4 md:flex-nowrap">
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {pagination?.totalItems} row(s) selected.
          </div>
          <div className="text-sm text-muted-foreground">
            Page {paginationState.currentPage} of {paginationState.totalPages}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              // disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              // disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
            <Button variant="outline" size="sm">
              <select
                value={limit}
                onChange={handleLimitChange}
                className="h-full w-full bg-transparent"
              >
                {[10, 50, 100].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
