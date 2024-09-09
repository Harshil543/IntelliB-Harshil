import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import MeterActionCell from '../cellsAction/meter.action.cell';

interface meterData {
  id: number;
  meterType: string;
  meterNumber: string;
  installationDate: Date;
  status: string;
  leasableUnitId: number;
}

const meterColumn: ColumnDef<meterData>[] = [
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
    header: 'Id',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'meterType',
    header: 'Meter Type',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('meterType') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'meterNumber',
    header: 'Meter Number',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('meterNumber') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'installationDate',
    header: 'Installation Date',
    cell: ({ row }) => (
      <div className="lowercase">
        {row.getValue('installationDate') ?? 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'leasableUnitId',
    header: 'Leasable Unit Id',
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {' '}
          {row.getValue('leasableUnitId') ?? 'N/A'}
        </div>
      );
    }
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        className={`${row.getValue('status') === 'Active' ? '' : 'bg-red-300'}`}
      >
        {row.getValue('status') ?? 'N/A'}
      </Badge>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;
      return <MeterActionCell id={id} status={currentStatus} />;
    }
  }
];

export default meterColumn;
