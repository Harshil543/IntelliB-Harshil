import { ColumnDef } from '@tanstack/react-table';
import MeterReadingActionCell from '../cellsAction/meter.reading.action.cell';
import { format } from 'date-fns';

interface MeterReadingData {
  id: number;
  meter: { meterNumber: number };
  readingDate: Date;
  readingValue: string[];
  status: string;
}

const MeterReadingColumn: ColumnDef<MeterReadingData>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false
  // },
  {
    id: 'serialNumber',
    header: 'Sr No',
    cell: ({ row }) => <div className="lowercase">{row.index + 1}</div>
  },
  {
    accessorKey: 'id',
    header: 'Code',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.id ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'meterNumber',
    header: 'Meter Number',
    cell: ({ row }) => {
      const meterId = row?.original?.meter?.meterNumber ?? 'N/A';
      return <div>{meterId}</div>;
    }
  },
  {
    accessorKey: 'readingDate',
    header: 'Reading Date',
    cell: ({ row }) => {
      const date = row.original.readingDate;
      const formattedDate = date
        ? format(new Date(date as Date), 'MM/dd/yyyy')
        : 'N/A';
      return <div className="capitalize">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'readingValue',
    header: 'Reading Value',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.readingValue ?? 'N/A'}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id as number;
      const currentStatus = row.original.status as string;
      return <MeterReadingActionCell id={id} status={currentStatus} />;
    }
  }
];

export default MeterReadingColumn;
