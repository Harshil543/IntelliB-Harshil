import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface InvoiceData {
  id: number;
  userName: string;
  property: string;
  unit: number;
  billingDate: Date;
  endDate: Date;
  amount: number;
  status: string;
}

const invoiceColumn: ColumnDef<InvoiceData>[] = [
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
    header: 'Invoice Id',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.id ?? 'N/A'}</div>
    )
  },
  // {
  //   accessorKey: 'userName',
  //   header: 'User Name',
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue('userName') ?? 'N/A'}</div>
  //   )
  // },
  // {
  //   accessorKey: 'property',
  //   header: 'Property',
  //   cell: ({ row }) => (
  //     <div className="lowercase">{row.getValue('property') ?? 'N/A'}</div>
  //   )
  // },
  {
    accessorKey: 'unit',
    header: 'Unit',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.unit ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'billingDate',
    header: 'Billing Date',
    cell: ({ row }) => {
      const installationDate = row.original.billingDate;

      // Check if the installationDate is valid
      const formattedDate = installationDate
        ? format(new Date(installationDate as Date), 'dd/MM/yyyy')
        : 'N/A';

      return <div className="lowercase">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      const installationDate = row.original.endDate;

      // Check if the installationDate is valid
      const formattedDate = installationDate
        ? format(new Date(installationDate as Date), 'dd/MM/yyyy')
        : 'N/A';

      return <div className="lowercase">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.amount ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
        className={`${row.original.status === 'paid' ? 'bg-green-700 text-white' : 'bg-red-300'} capitalize`}
      >
        {row.original.status ?? 'N/A'}
      </Badge>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: () => {
      return (
        <Badge
          className={`cursor-pointer bg-gray-200 capitalize`}
          onClick={() => console.log('Generate bill')}
        >
          Generate Bills
        </Badge>
      );
    }
  }
];

export default invoiceColumn;
