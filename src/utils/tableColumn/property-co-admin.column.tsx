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
import { statusPropertyCoAdmin } from '@/services/property-co-admin.service';
import { Checkbox } from '@/components/ui/checkbox';

interface PropertyCoAdminColumns {
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
    accessorKey: 'serialNumber',
    header: 'Sr No',
    cell: ({ row }) => <div className="lowercase">{row.index + 1}</div>
  },
  {
    accessorKey: 'id',
    header: 'id',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;
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
      const propertyCoAdminId = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;
      const queryClient = useQueryClient();
      const router = useRouter();

      const statusMutation = useMutation({
        mutationFn: statusPropertyCoAdmin
      });

      const handleView = (id: number) => {
        router.push(`/property-co-admin/view-property-co-admin/${id}`);
      };

      const handleUpdate = (id: number) => {
        router.push(`/property-co-admin/update-property-co-admin/${id}`);
      };

      const handleStatus = async (id: number, status: string) => {
        const payload = {
          payload: {
            id,
            status: status === 'Active' ? 'Inactive' : 'Active'
          },
          id
        };

        try {
          statusMutation.mutate(payload, {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: ['property-co-admin']
              });
              toast.success(`Status updated successfully`);
            }
          });
        } catch (error) {
          console.error('Error updating property co-admin status:', error);
        }
      };

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
            <DropdownMenuItem onClick={() => handleView(propertyCoAdminId)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(propertyCoAdminId)}>
              Update
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleStatus(propertyCoAdminId, currentStatus)}
            >
              {currentStatus === 'Active' ? 'De-Activate' : 'Activate'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default propertyCoAdminColumns;
