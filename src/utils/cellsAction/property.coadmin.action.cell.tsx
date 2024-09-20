// src/components/PropertyCoAdminActionCell.tsx
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
import { statusPropertyCoAdmin } from '@/services/property-co-admin.service';

interface PropertyCoAdminActionCellProps {
  propertyCoAdminId: number;
  status: string;
}

const PropertyCoAdminActionCell: React.FC<PropertyCoAdminActionCellProps> = ({
  propertyCoAdminId,
  status
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const statusMutation = useMutation({
    mutationFn: (id: number) => statusPropertyCoAdmin(id)
  });

  const handleView = (id: number) => {
    router.push(`/property-co-admin/view-property-co-admin/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/property-co-admin/update-property-co-admin/${id}`);
  };

  const handleStatus = async (id: number) => {
    try {
      statusMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['property-co-admin'] });
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
          onClick={() => handleStatus(propertyCoAdminId)}
          className="cursor-pointer"
        >
          {status === 'active' ? 'In-Activate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertyCoAdminActionCell;
