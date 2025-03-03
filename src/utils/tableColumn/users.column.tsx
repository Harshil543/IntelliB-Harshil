import { ColumnDef } from '@tanstack/react-table';
import PropertyUserActionsCell from '../cellsAction/property.user.action.cell';

interface InvoiceData {
  id: number;
  company: {
    companyName: string;
  };
  invoiceNumber: number;
  billDate: Date;
  dueDate: Date;
  totalAmount: number;
  paymentStatus: string;
  status: string;
}

const userColumn: ColumnDef<InvoiceData>[] = [
  {
    id: 'serialNumber',
    header: 'Sr No',
    cell: ({ row }) => <div className="lowercase">{row.index + 1}</div>
  },
  {
    accessorKey: 'Name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.id ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'Contact Number',
    header: 'Contact Number',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.company.companyName ?? 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'Email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.company.companyName ?? 'N/A'}
      </div>
    )
  },
  {
    accessorKey: 'Designation',
    header: 'Designation',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.invoiceNumber ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'Role',
    header: 'Role',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.invoiceNumber ?? 'N/A'}</div>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const propertyUserId = row.original.id as number;
      const currentStatus = row.original.status as string;

      return (
        <PropertyUserActionsCell
          propertyUserId={propertyUserId}
          currentStatus={currentStatus}
        />
      );
    }
  }
];

export default userColumn;
