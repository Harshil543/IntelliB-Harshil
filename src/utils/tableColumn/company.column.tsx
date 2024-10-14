import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import CompanyActionCell from '../cellsAction/company.action.cell';

interface CompanyData {
  id: number;
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  email: string;
  countryCode: string;
  mobileNumber: string;
  websiteUrl: string;
  gstNumber: string;
  cinNumber: string;
  status: string;
}

const companyColumns: ColumnDef<CompanyData>[] = [
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
    accessorKey: 'companyName',
    header: 'Company Name',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('companyName') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('email') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'addressLine1',
    header: 'Address',
    cell: ({ row }) => {
      const addressLine1 = row.original.addressLine1;
      const city = row.original.city;
      const state = row.original.state;
      // const country = row.original.country;
      const pincode = row.original.pincode;

      return (
        <div className="capitalize">
          {`${addressLine1}, ${city} ${state} ${pincode}`}
        </div>
      );
    }
  },
  {
    accessorKey: 'mobileNumber',
    header: 'Contact',
    cell: ({ row }) => {
      const countryCode = row.original.countryCode;
      const mobileNumber = row.original.mobileNumber;
      return (
        <div className="capitalize">{`+${countryCode} ${mobileNumber}`}</div>
      );
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
      const status = row.getValue('status') as string;

      return <CompanyActionCell id={id} status={status} />;
    }
  }
];

export default companyColumns;
