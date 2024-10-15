import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import EmailSettingActionsCell from '../cellsAction/email.setting.action.cell';

interface EmailSettingData {
  id: number;
  mailDeliver: string;
  mailHost: string;
  mailPort: string;
  mailUsername: string;
  mailPassword: string;
  mailEncryption: string;
  mailFromAddress: string;
  mailFromName: string;
}

const EmailSettingColumn: ColumnDef<EmailSettingData>[] = [
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
    cell: ({ row }) => <div className="capitalize">{row.index + 1}</div>
  },
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'mailDeliver',
    header: 'Mail Deliver',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('mailDeliver') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'mailHost',
    header: 'Mail Host',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('mailHost') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'mailPort',
    header: 'Mail Port',
    cell: ({ row }) => {
      <div className="capitalize">{row.getValue('mailPort') ?? 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'mailUsername',
    header: 'Mail Username',
    cell: ({ row }) => {
      <div className="capitalize">{row.getValue('mailUsername') ?? 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'mailPassword',
    header: 'Mail Password',
    cell: ({ row }) => {
      <div className="capitalize">{row.getValue('mailPassword') ?? 'N/A'}</div>;
    }
  },
  {
    accessorKey: 'mailEncryption',
    header: 'Mail Encryption',
    cell: ({ row }) => {
      <div className="capitalize">
        {row.getValue('mailEncryption') ?? 'N/A'}
      </div>;
    }
  },
  {
    accessorKey: 'mailFromAddress',
    header: 'Mail From Address',
    cell: ({ row }) => {
      <div className="capitalize">
        {row.getValue('mailFromAddress') ?? 'N/A'}
      </div>;
    }
  },
  {
    accessorKey: 'mailFromName',
    header: 'Mail From Name',
    cell: ({ row }) => {
      <div className="capitalize">{row.getValue('mailFromName') ?? 'N/A'}</div>;
    }
  },

  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    cell: (info) => <EmailSettingActionsCell row={info.row} />
  }
];

export default EmailSettingColumn;
