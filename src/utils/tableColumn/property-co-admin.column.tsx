import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import PropertyCoAdminActionCell from '../cellsAction/property.coadmin.action.cell';

interface PropertyCoAdminColumns {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  role: string;
  designation: string;
  salutation: string;
  status: string;
}

const propertyCoAdminColumns: ColumnDef<PropertyCoAdminColumns>[] = [
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
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const salutation = row?.original?.salutation;
      const firstName = row?.original?.firstName;
      const lastName = row?.original?.lastName;
      return (
        <div className="capitalize">{`${salutation} ${firstName} ${lastName}`}</div>
      );
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
      const countryCode = row.original.countryCode;
      const mobileNumber = row.original.mobileNumber;
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
      const propertyCoAdminId = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;
      return (
        <PropertyCoAdminActionCell
          propertyCoAdminId={propertyCoAdminId}
          status={currentStatus}
        />
      );
    }
  }
];

export default propertyCoAdminColumns;
