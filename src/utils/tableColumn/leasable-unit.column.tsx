import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import LeasableUnitActionCell from '../cellsAction/leasable.unit.action.cell';

interface LeasableUnitData {
  id: number;
  name: string;
  floorAndWing: string;
  smartMeterId: string[];
  status: string;
}

const leasableUnitColumn: ColumnDef<LeasableUnitData>[] = [
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
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('name') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'floorAndWing',
    header: 'Floor/Wing',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('floorAndWing') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'smartMeterId',
    header: 'Smart Meter Id',
    cell: ({ row }) => {
      const smartMeterIds = row.original.smartMeterId;

      const formattedSmartMeterIds = Array.isArray(smartMeterIds)
        ? smartMeterIds.join(', ')
        : smartMeterIds;

      return <div className="lowercase">{formattedSmartMeterIds}</div>;
    }
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        className={`${row.getValue('status') === 'active' ? 'bg-green-700 text-white' : 'bg-red-300'} capitalize`}
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
      return <LeasableUnitActionCell id={id} status={currentStatus} />;
    }
  }
];

export default leasableUnitColumn;
