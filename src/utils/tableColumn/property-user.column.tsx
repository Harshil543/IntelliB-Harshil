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
import { deletePropertyUser } from '@/services/property-user.service';

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
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('firstName') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'lastName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('lastName') ?? 'N/A'}</div>
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
    accessorKey: 'mobileNumber',
    header: 'Contact',
    cell: ({ row }) => {
      const countryCode = row.getValue('countryCode') ?? '';
      const mobileNumber = row.getValue('mobileNumber') ?? '';
      return (
        <div className="lowercase">{`${countryCode} ${mobileNumber}`}</div>
      );
    }
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('role') ?? 'N/A'}</div>
    )
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
    cell: ({ row }) => <Badge>{row.getValue('status') ?? 'N/A'}</Badge>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const propertyUserId = row.getValue('id') as number;
      const queryClient = useQueryClient();
      const router = useRouter();

      const delteMutation = useMutation({
        mutationFn: deletePropertyUser
      });

      const handleUpdate = (id: number) => {
        router.push(`/property-user/${id}`);
      };

      const handleDelete = async (id: number) => {
        try {
          delteMutation.mutate(id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['property-user'] });
              toast.success(`Deleted successfully`);
            }
          });
        } catch (error) {
          console.error('Error deleting property user:', error);
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
            <DropdownMenuItem onClick={() => handleUpdate(propertyUserId)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(propertyUserId)}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {row.getValue('status') === 'active' ? 'De-Activate' : 'Activate'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default propertyUserColumns;
