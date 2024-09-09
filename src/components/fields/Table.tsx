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
// import autoTable from 'jspdf-autotable';
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
// import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  path: string;
};

export function DataTable<T>({ columns, data, path }: DataTableProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
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

  const exportCSV = () => {
    const selectedRows = table
      .getRowModel()
      .rows.filter((row) => row.getIsSelected());
    const rows = selectedRows.map((row) => row.original);

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
    const rows = selectedRows.map((row) => row.original);
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, `${pathname.split('/')[1]}.xlsx`);
  };

  const exportPDF = () => {
    // const selectedRows = table
    //   .getRowModel()
    //   .rows.filter((row) => row.getIsSelected());
    // const rows = selectedRows.map((row) => row.original);
    // const doc = new jsPDF();
    // doc.text('Table Data', 20, 20);
    // const filteredColumns = columns.filter((column) => column.id !== 'select');
    // const tableColumn = filteredColumns.map((col) => col.header as string);
    // const tableRows = rows.map((row) =>
    //   filteredColumns.map((col) => {
    //     // Using `col.accessorKey` assuming it's a string key in the row object
    //     const accessor = col.accessorKey as keyof T;
    //     return row[accessor];
    //   })
    // );
    // autoTable(doc, {
    //   head: [tableColumn],
    //   body: tableRows
    // });
    // doc.save(`${pathname.split('/')[1]}.pdf`);
  };

  const handleDownloadTemplate = () => {
    // Filter out columns that you don't want in the template
    const filteredColumns = table
      .getAllColumns()
      .filter(
        (column) =>
          !['select', 'serialNumber', 'id', 'actions'].includes(column.id)
      );

    // Get the headers from the filtered columns
    const headers = filteredColumns.map(
      (column) => column.columnDef.header as string
    );

    // Create a worksheet with only the filtered headers
    const worksheet = XLSX.utils.aoa_to_sheet([headers]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    // Export the workbook as an XLSX file
    XLSX.writeFile(workbook, `${pathname.split('/')[1]}.xlsx`);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-4 sm:flex-wrap md:flex-nowrap">
        <Input
          placeholder="Search..."
          className="mr-2 w-full rounded-full border-border bg-background"
        />
        <div className="flex items-center space-x-2">
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
        </div>
        <Button onClick={() => handleNavigate(path)}>Add</Button>
      </div>
      <div className="rounded-lg border bg-background">
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
