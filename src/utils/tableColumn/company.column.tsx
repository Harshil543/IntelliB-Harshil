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
import { statusCompany } from '@/services/company.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Checkbox } from '@/components/ui/checkbox';

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
      <div className="lowercase">{row.getValue('companyName') ?? 'N/A'}</div>
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
      const country = row.original.country;
      const pincode = row.original.pincode;

      return (
        <div className="lowercase">
          {`${addressLine1}, ${city} ${state} ${country} ${pincode}`}
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
        <div className="lowercase">{`+${countryCode} ${mobileNumber}`}</div>
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
      const propertyUserId = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;
      const queryClient = useQueryClient();
      const router = useRouter();

      const statusMutation = useMutation({
        mutationFn: statusCompany
      });

      const handleView = (id: number) => {
        router.push(`/company/view-company/${id}`);
      };

      const handleUpdate = (id: number) => {
        router.push(`/company/update-company/${id}`);
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
              queryClient.invalidateQueries({ queryKey: ['company'] });
              toast.success(`Status updated successfully`);
            }
          });
        } catch (error) {
          console.error('Error updating company status:', error);
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
            <DropdownMenuItem onClick={() => handleView(propertyUserId)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(propertyUserId)}>
              Update
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleStatus(propertyUserId, currentStatus)}
            >
              {currentStatus === 'Active' ? 'De-Activate' : 'Activate'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default companyColumns;
