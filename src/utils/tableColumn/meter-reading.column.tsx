import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import MeterReadingActionCell from '../cellsAction/meter.reading.action.cell';
import { format } from 'date-fns';

interface MeterReadingData {
  id: number;
  meter: { meterNumber: number };
  readingDate: string;
  readingValue: string[];
}

const MeterReadingColumn: ColumnDef<MeterReadingData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'serialNumber',
    header: 'Sr No',
    cell: ({ row }) => <div className="lowercase">{row.index + 1}</div>
  },
  {
    accessorKey: 'id',
    header: 'Code',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'meter',
    header: 'Meter Number',
    cell: ({ row }) => {
      const meterId = row?.original?.meter?.meterNumber ?? 'N/A';
      return <div className="lowercase">{meterId}</div>;
    }
  },
  {
    accessorKey: 'readingDate',
    header: 'Reading Date',
    cell: ({ row }) => {
      const date = row.getValue('readingDate');
      const formattedDate = date
        ? format(new Date(date as Date), 'dd/MM/yyyy')
        : 'N/A';
      return <div className="capitalize">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'readingValue',
    header: 'Reading Value',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('readingValue') ?? 'N/A'}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;
      return <MeterReadingActionCell id={id} status={currentStatus} />;
    }
  }
];

export default MeterReadingColumn;
