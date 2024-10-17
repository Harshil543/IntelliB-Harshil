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
    id: 'serialNumber',
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
    accessorKey: 'unitName',
    header: 'Unit Name',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('unitName') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'unitNumber',
    header: 'Unit Number',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('unitNumber') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'unitType',
    header: 'Unit Type',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('unitType') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'floor',
    header: 'Floor/Wing',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('floor') ?? 'N/A'}</div>
    )
  },

  {
    accessorKey: 'squareFootage',
    header: 'Square Footage',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('squareFootage') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        className={`${row.getValue('status') === 'available' ? 'bg-green-700 text-white' : row.getValue('status') === 'leased' ? 'bg-yellow-300' : 'bg-red-300'} capitalize`}
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
