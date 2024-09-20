// src/components/LeasableUnitActionCell.tsx

import React from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
// import { statusLeasableUnit } from '@/services/leasable-unit.service';

interface LeasableUnitActionCellProps {
  id: number;
  status: string;
}

const LeasableUnitActionCell: React.FC<LeasableUnitActionCellProps> = ({
  id,
  status
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const statusMutation = useMutation({
    // mutationFn: statusLeasableUnit
  });

  const handleView = () => {
    router.push(`/leasable-unit/view-leasable-unit/${id}`);
  };

  const handleUpdate = () => {
    router.push(`/leasable-unit/update-leasable-unit/${id}`);
  };

  const handleStatus = async () => {
    const newStatus = status === 'Active' ? 'Inactive' : 'Active';
    const payload = {
      payload: {
        id,
        status: newStatus
      },
      id
    };

    try {
      await statusMutation.mutateAsync(payload as any);
      queryClient.invalidateQueries({ queryKey: ['leasable-unit'] });
      toast.success(`Status updated successfully`);
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
        <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleStatus}>
          {status === 'Active' ? 'De-list' : 'List'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeasableUnitActionCell;
