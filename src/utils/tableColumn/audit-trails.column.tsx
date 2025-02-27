import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { generateInvoice } from '@/services/invoice.service';
import apiBillingClient from '@/config/api.billing.config';
import { BASE_URLS } from '@/constants/api.constants';

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
}

const auditTrailsColumn: ColumnDef<InvoiceData>[] = [
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
  {
    accessorKey: 'user_name',
    header: 'User Name',
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.company.companyName ?? 'N/A'}
      </div>
    )
  },

  {
    accessorKey: 'role',
    header: 'Role',
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
  {
    accessorKey: 'paymentStatus',
    header: 'Payment Status',
    cell: ({ row }) => (
      <Badge
        className={`${row.original.paymentStatus === 'PAID' ? 'bg-green-700 text-white' : 'bg-red-300'} capitalize`}
      >
        {row.original.paymentStatus ?? 'N/A'}
      </Badge>
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const handleGenerateInvoice = () => {
        const billId = row.original.id;
        generateInvoice(billId); // Generate Invoice as per your logic
      };

      const handlePreviewInvoice = async () => {
        const billId = row.original.id;
        try {
          const response = await apiBillingClient.get(
            `${BASE_URLS?.invoice}/${billId}/invoice`
          );
          const { base64File } = response?.data?.data;

          // Preview the invoice in a new window
          const byteCharacters = atob(base64File.split(',')[1]); // Decode base64 part
          const byteArrays = [];

          for (let offset = 0; offset < byteCharacters.length; offset++) {
            byteArrays.push(byteCharacters.charCodeAt(offset));
          }

          const blob = new Blob([new Uint8Array(byteArrays)], {
            type: 'application/pdf'
          });

          const previewWindow = window.open('', '_blank'); // Open a new tab
          const url = URL.createObjectURL(blob);
          previewWindow?.document.write(`
            <html>
              <head><title>Preview Invoice</title></head>
              <body>
                <embed src="${url}" width="100%" height="100%" />
              </body>
            </html>
          `);
        } catch (error) {
          console.error('Error previewing invoice:', error);
        }
      };

      return (
        <div className="flex space-x-2">
          <Badge
            className="cursor-pointer bg-blue-200 capitalize"
            onClick={handlePreviewInvoice}
          >
            Preview Bill
          </Badge>
          <Badge
            className="cursor-pointer bg-gray-200 capitalize"
            onClick={handleGenerateInvoice}
          >
            Download Bill
          </Badge>
        </div>
      );
    }
  }
];

export default auditTrailsColumn;
