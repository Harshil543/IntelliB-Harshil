// components/PropertyUserActionsCell.tsx
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
import { statusPropertyUser } from '@/services/property-user.service';

interface PropertyUserActionsCellProps {
  propertyUserId: number;
  currentStatus: string;
}

const PropertyUserActionsCell: React.FC<PropertyUserActionsCellProps> = ({
  propertyUserId,
  currentStatus
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const statusMutation = useMutation({
    mutationFn: statusPropertyUser
  });

  const handleView = (id: number) => {
    router.push(`/property-user/view-property-user/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/property-user/update-property-user/${id}`);
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
          queryClient.invalidateQueries({ queryKey: ['property-user'] });
          toast.success(`Status updated successfully`);
        }
      });
    } catch (error) {
      console.error('Error updating property user status:', error);
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
};

export default PropertyUserActionsCell;
