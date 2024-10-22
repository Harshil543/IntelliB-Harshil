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
import { Parser } from 'json2csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
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
  onSearch: (query: string) => void;
  isUseExport?: boolean;
  isUseImport?: boolean;
};

export function DataTable<T>({
  columns,
  data,
  pagination,
  addButton,
  path,
  limit,
  handleNext,
  handlePrevious,
  handleLimitChange,
  onSearch,
  isUseExport = true,
  isUseImport = false
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
        pageIndex: paginationState.currentPage - 1, // Use the current page
        pageSize: limit || 10 // Default to 10 if limit is undefined
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

  const exportCSV = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());

    const rows = selectedRows.length
      ? selectedRows.map((row) => row.original)
      : data;

    const fields = Object.keys(rows[0] || {});
    const parser = new Parser({ fields });
    const csv = parser.parse(rows);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${pathname.split('/')[1]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportXLSX = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());

    const rows = selectedRows.length
      ? selectedRows.map((row) => row.original)
      : data;

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${pathname.split('/')[1]}.xlsx`);
  };

  const exportPDF = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    const rows = selectedRows.length
      ? selectedRows.map((row) => row.original)
      : data;

    const doc = new jsPDF();
    doc.text(`${pathname.split('/')[1]} Data`, 20, 10);

    const filteredColumns = columns.filter(
      (column) => column.id !== 'select' && column.id !== 'serialNumber'
    );

    const tableColumn = filteredColumns.map((col) => col.header as string);
    const tableRows = rows.map((row: any) =>
      filteredColumns.map((col: any) => {
        const accessor = col.accessorKey;
        return row[accessor] || '';
      })
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'striped',
      styles: { halign: 'center' },
      margin: { top: 20 }
    });

    doc.save(`${pathname.split('/')[1]}.pdf`);
  };

  const handleDownloadTemplate = () => {
    const headers = [
      'Company Name',
      'Email',
      'Mobile No',
      'Address Line 1',
      'Address Line 2',
      'Country',
      'State',
      'City',
      'Pincode',
      'Website URL',
      'GST Number',
      'CIN Number',
      'Property Name'
    ];

    const propertycoadminheader = [
      'Salutation',
      'First Name',
      'Last Name',
      'Email',
      'Mobile Number',
      'Designation'
    ];

    const leasableunitheader = [
      'Unit Number',
      'Unit Type',
      'Leasable Unit Name',
      'Floor/Wing',
      'Floor Area',
      'Status'
    ];

    const worksheet = XLSX.utils.aoa_to_sheet([
      pathname === '/property-co-admin/'
        ? propertycoadminheader
        : pathname === '/leasable-unit/'
          ? leasableunitheader
          : headers
    ]);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    XLSX.writeFile(workbook, `${pathname.split('/')[1]}_template.xlsx`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 py-4 sm:flex-wrap md:flex-nowrap">
        <Input
          placeholder="Search..."
          className="w-full rounded-3xl border-border bg-background"
          value={searchQuery}
          onChange={handleSearchChange}
        />
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
          {isUseImport ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Import
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTemplate}
                >
                  Download Template
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => console.log('Import Data')}
                >
                  Import Data
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
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
    </div>
  );
}
