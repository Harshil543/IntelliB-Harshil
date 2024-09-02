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
import { statusLeasableUnit } from '@/services/leasable-unit.service';

interface LeasableUnitData {
  id: number;
  name: string;
  floorAndWing: string;
  smartMeterId: string[];
  status: string;
}

const leasableUnitColumn: ColumnDef<LeasableUnitData>[] = [
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
    header: 'Code',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('id') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('name') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'floorAndWing',
    header: 'Floor/Wing',
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('floorAndWing') ?? 'N/A'}</div>
    )
  },
  {
    accessorKey: 'smartMeterId',
    header: 'Smart Meter Id',
    cell: ({ row }) => {
      const smartMeterIds = row.original.smartMeterId;

      const formattedSmartMeterIds = Array.isArray(smartMeterIds)
        ? smartMeterIds.join(', ')
        : smartMeterIds;

      return <div className="lowercase">{formattedSmartMeterIds}</div>;
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
      const id = row.getValue('id') as number;
      const currentStatus = row.getValue('status') as string;
      const queryClient = useQueryClient();
      const router = useRouter();

      const statusMutation = useMutation({
        mutationFn: statusLeasableUnit
      });

      const handleView = (id: number) => {
        router.push(`/leasable-unit/view-leasable-unit/${id}`);
      };

      const handleUpdate = (id: number) => {
        router.push(`/leasable-unit/update-leasable-unit/${id}`);
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
              queryClient.invalidateQueries({ queryKey: ['leasable-unit'] });
              toast.success(`Status updated successfully`);
            }
          });
        } catch (error) {
          console.error('Error updating leasable-unit status:', error);
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
            <DropdownMenuItem onClick={() => handleView(id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUpdate(id)}>
              Update
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleStatus(id, currentStatus)}>
              {currentStatus === 'Active' ? 'De-list' : 'List'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default leasableUnitColumn;
