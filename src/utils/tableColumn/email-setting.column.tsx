import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';

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
    accessorKey: 'serialNumber',
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
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.getValue('id') as number;
      //   const currentStatus = row.getValue('status') as string;
      //   const queryClient = useQueryClient();
      const router = useRouter();

      //   const statusMutation = useMutation({
      //     mutationFn: statusLeasableUnit
      //   });

      const handleView = (id: number) => {
        router.push(`/settings/email-setting/view-email-setting/${id}`);
      };

      const handleUpdate = (id: number) => {
        router.push(`/settings/email-setting/update-email-setting/${id}`);
      };

      //   const handleStatus = async (id: number, status: string) => {
      //     const payload = {
      //       payload: {
      //         id,
      //         status: status === 'Active' ? 'Inactive' : 'Active'
      //       },
      //       id
      //     };

      //     try {
      //       statusMutation.mutate(payload, {
      //         onSuccess: () => {
      //           queryClient.invalidateQueries({ queryKey: ['leasable-unit'] });
      //           toast.success(`Status updated successfully`);
      //         }
      //       });
      //     } catch (error) {
      //       console.error('Error updating leasable-unit status:', error);
      //     }
      //   };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="none">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleView(id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(id)}>
              Update
            </DropdownMenuItem>

            {/* <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStatus(id, currentStatus)}>
              {currentStatus === 'Active' ? 'De-list' : 'List'}
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default EmailSettingColumn;
