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
import { deleteCompany } from '@/services/company.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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
      const addressLine1 = row.getValue('addressLine1') ?? '';
      const addressLine2 = row.getValue('addressLine2') ?? '';
      const city = row.getValue('city') ?? '';
      const state = row.getValue('state') ?? '';
      const country = row.getValue('country') ?? '';
      const pincode = row.getValue('pincode') ?? '';
      return (
        <div className="lowercase">
          {`${addressLine1}${addressLine2 ? ', ' + addressLine2 : ''}, ${city}, ${state}, ${country}, ${pincode}`}
        </div>
      );
    }
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
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <Badge>{row.getValue('status') ?? 'N/A'}</Badge>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const companyId = row.getValue('id') as number;
      const queryClient = useQueryClient();
      const router = useRouter();

      const delteMutation = useMutation({
        mutationFn: deleteCompany
      });

      const handleUpdate = (id: number) => {
        router.push(`/company/${id}`);
      };

      const handleDelete = async (id: number) => {
        try {
          delteMutation.mutate(id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['company'] });
              toast.success(
                `${row.getValue('companyName')} deleted successfully`
              );
            }
          });
        } catch (error) {
          console.error('Error deleting company:', error);
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
            <DropdownMenuItem onClick={() => handleUpdate(companyId)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(companyId)}>
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

export default companyColumns;
