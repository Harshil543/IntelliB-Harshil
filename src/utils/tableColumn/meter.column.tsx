import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import MeterActionCell from '../cellsAction/meter.action.cell';
import { format } from 'date-fns';

interface MeterData {
  id: number;
  meterType: string;
  meterNumber: string;
  installationDate: Date;
  status: string;
  leasableUnitId: number;
}

const meterColumn: ColumnDef<MeterData>[] = [
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
      <div className="capitalize">{row.getValue('meterType') ?? 'N/A'}</div>
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
    cell: ({ row }) => {
      const installationDate = row.getValue('installationDate');

      // Check if the installationDate is valid
      const formattedDate = installationDate
        ? format(new Date(installationDate as Date), 'dd/MM/yyyy')
        : 'N/A';

      return <div className="lowercase">{formattedDate}</div>;
    }
  },

  {
    accessorKey: 'leasableUnitId',
    header: 'Leasable Unit Id',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('leasableUnitId') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        className={`${row.getValue('status') === 'active' ? 'bg-green-700 text-white' : row.getValue('status') === 'maintenance' ? 'bg-yellow-300' : 'bg-red-300'} capitalize`}
      >
        {row.getValue('status') ?? 'N/A'}
      </Badge>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const {
        id,
        meterType,
        meterNumber,
        installationDate,
        leasableUnitId,
        status
      } = row.original;

      return (
        <MeterActionCell
          id={id}
          meterType={meterType}
          meterNumber={meterNumber}
          installationDate={installationDate}
          leasableUnitId={leasableUnitId}
          status={status}
        />
      );
    }
  }
];

export default meterColumn;
