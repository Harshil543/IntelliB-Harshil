// src/components/PropertyCoAdminActionCell.tsx
import React, { useState } from 'react';
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
import {
  deletePropertyCoAdmin,
  statusPropertyCoAdmin
} from '@/services/property-co-admin.service';
import { DeleteModal } from '@/components/CommonComponents/DeleteModal';

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deletePropertyCoAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['property-co-admin'] });
      toast.success('Property Co-Admin deleted successfully');
      setDeleteModalOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting Property Co-Admin:', error);
      toast.error('Failed to delete Property Co-Admin');
    }
  });
  const statusMutation = useMutation({
    mutationFn: (id: number) => statusPropertyCoAdmin(id)
  });

  const handleView = (id: number) => {
    router.push(`/property-co-admin/view-property-co-admin/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/property-co-admin/update-property-co-admin/${id}`);
  };

  const handleDelete = () => {
    deleteMutation.mutate(propertyCoAdminId);
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
    <>
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
          <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
            Delete
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
      <DeleteModal
        modalOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this Property Co-Admin?"
      />
    </>
  );
};

export default PropertyCoAdminActionCell;
