import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { generateInvoice } from '@/services/invoice.service';

interface InvoiceData {
  id: number;
  userName: string;
  property: string;
  invoiceNumber: number;
  billDate: Date;
  dueDate: Date;
  totalAmount: number;
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
    accessorKey: 'invoiceNumber',
    header: 'Invoice Number',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.invoiceNumber ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'billDate',
    header: 'Billing Date',
    cell: ({ row }) => {
      const installationDate = row.original.billDate;

      const formattedDate = installationDate
        ? format(new Date(installationDate as Date), 'dd/MM/yyyy')
        : 'N/A';

      return <div className="lowercase">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'dueDate',
    header: 'Due Date',
    cell: ({ row }) => {
      const installationDate = row.original.dueDate;

      const formattedDate = installationDate
        ? format(new Date(installationDate as Date), 'dd/MM/yyyy')
        : 'N/A';

      return <div className="lowercase">{formattedDate}</div>;
    }
  },
  {
    accessorKey: 'totalAmount',
    header: 'Amount',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.totalAmount ?? 'N/A'}</div>
    )
  },
  // {
  //   accessorKey: 'status',
  //   header: 'Status',
  //   cell: ({ row }) => (
  //     <Badge
  //       className={`${row.original.status === 'paid' ? 'bg-green-700 text-white' : 'bg-red-300'} capitalize`}
  //     >
  //       {row.original.status ?? 'N/A'}
  //     </Badge>
  //   )
  // },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const handleGenerateInvoice = () => {
        const billId = row.original.id;
        generateInvoice(billId);
      };

      return (
        <Badge
          className={`cursor-pointer bg-gray-200 capitalize`}
          onClick={handleGenerateInvoice}
        >
          Generate Bills
        </Badge>
      );
    }
  }
];

export default invoiceColumn;
