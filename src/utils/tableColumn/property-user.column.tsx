import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import PropertyUserActionsCell from '@/utils/cellsAction/property.user.action.cell';

interface PropertyUserColumns {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  role: string;
  designation: string;
  status: string;
}

const propertyUserColumns: ColumnDef<PropertyUserColumns>[] = [
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
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const firstName = row.getValue('firstName');
      const lastName = row.getValue('lastName');
      return <div className="capitalize">{`${firstName} ${lastName}`}</div>;
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('email') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Contact',
    cell: ({ row }) => {
      const countryCode = row.getValue('countryCode');
      const mobileNumber = row.getValue('mobileNumber');
      return (
        <div className="lowercase">{`+${countryCode} ${mobileNumber}`}</div>
      );
    }
  },
  {
    accessorKey: 'designation',
    header: 'Designation',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('designation') ?? 'N/A'}</div>
    )
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
      const propertyUserId = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;

      return (
        <PropertyUserActionsCell
          propertyUserId={propertyUserId}
          currentStatus={currentStatus}
        />
      );
    }
  }
];

export default propertyUserColumns;
