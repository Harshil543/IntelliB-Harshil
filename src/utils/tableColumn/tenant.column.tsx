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

interface tenantData {
  id?: number;
  tenantName: string;
  gstNumber: string;
  cinNumber: string;
  address: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobileNumber: string;
  email: string;
  leasedUnit: string;
  leasedStartDate: string;
  leasedEndDate: string;
  bilingMethod: string;
  bilingType: string;
  bilingCycle: string;
  limit: string;
  status: string;
}

const tenantColumn: ColumnDef<tenantData>[] = [
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
    header: 'Tenant Id',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'companyName',
    header: 'Tenant Name',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('companyName') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'firstName',
    header: 'Admin Name',
    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const lastName = row.original.lastName;

      return <div className="capitalize">{`${firstName} ${lastName} `}</div>;
    }
  },
  {
    accessorKey: 'leasedUnit',
    header: 'Leasable Unit',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('leasedUnit') ?? 'N/A'}</div>
    )
  },

  {
    accessorKey: 'leasedStartDate',
    header: 'Leasable Start',
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {row.getValue('leasedStartDate') ?? 'N/A'}
        </div>
      );
    }
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
      const tenantId = row.getValue('id') as number;
      const queryClient = useQueryClient();
      const router = useRouter();

      //   const delteMutation = useMutation({
      //     mutationFn: deletetenant
      //   });

      const handleView = (id: number) => {
        router.push(`/tenants/view-tenant/${id}`);
      };

      const handleUpdate = (id: number) => {
        router.push(`/tenants/update-tenant/${id}`);
      };

      const handleStatus = async (id: number) => {
        try {
          //   delteMutation.mutate(id, {
          //     onSuccess: () => {
          //       queryClient.invalidateQueries({ queryKey: ['tenant'] });
          //       toast.success(`Deleted successfully`);
          //     }
          //   });
        } catch (error) {
          console.error('Error deleting tenant:', error);
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
            <DropdownMenuItem onClick={() => handleView(tenantId)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(tenantId)}>
              Update
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStatus(tenantId)}>
              {row.getValue('status') === 'Active' ? 'De-Activate' : 'Activate'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default tenantColumn;
