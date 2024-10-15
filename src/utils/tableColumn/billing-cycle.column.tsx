import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface LeasableUnitData {
  id: number;
  name: string;
  startDate: string;
  endDate: string[];
  status: string;
}

const billingCycleColumn: ColumnDef<LeasableUnitData>[] = [
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
    header: 'Id',
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
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('startDate') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('endDate') ?? 'N/A'}</div>
    )
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
    accessorKey: 'action',
    header: 'Action',
    cell: () => (
      <Button
        type="button"
        className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
      >
        Generate Bill
      </Button>
    )
  }
];

export default billingCycleColumn;
