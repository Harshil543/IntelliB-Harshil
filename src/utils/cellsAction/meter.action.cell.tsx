// src/components/MeterActionCell.tsx
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
import { statusMeter } from '@/services/meter.service';

interface MeterActionCellProps {
  id: number;
  meterType: string;
  meterNumber: string;
  installationDate: Date;
  status: string;
  leasableUnitId: number;
}

const MeterActionCell: React.FC<MeterActionCellProps> = ({ id, status }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const statusMutation = useMutation({
    mutationFn: statusMeter
  });

  const handleView = () => {
    router.push(`/meter/view-meter/${id}`);
  };

  const handleUpdate = () => {
    router.push(`/meter/update-meter/${id}`);
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
      await statusMutation.mutateAsync(payload);
      queryClient.invalidateQueries({ queryKey: ['meter'] });
      toast.success(`Status updated successfully`);
    } catch (error) {
      console.error('Error updating meter status:', error);
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
          {status === 'Active' ? 'De-Activate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MeterActionCell;
