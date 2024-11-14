// components/TenantActionsCell.tsx
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
import { deleteTenant, statusTenant } from '@/services/tenant.service';
import { DeleteModal } from '@/components/CommonComponents/DeleteModal';

interface TenantActionsCellProps {
  tenantId: number;
  status: string;
}

const TenantActionsCell: React.FC<TenantActionsCellProps> = ({
  tenantId,
  status
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const statusMutation = useMutation({
    mutationFn: (id: number) => statusTenant(id)
  });

  const handleView = (id: number) => {
    router.push(`/tenant/view-tenant/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/tenant/update-tenant/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenant'] });
      toast.success(' Tenant deleted successfully');
      setDeleteModalOpen(false);
    },
    onError: (error) => {
      console.error('Error deleting Tenant:', error);
      toast.error('Failed to delete Tenant');
    }
  });

  const handleDelete = () => {
    deleteMutation.mutate(tenantId);
  };

  const handleStatus = async (id: number) => {
    try {
      statusMutation.mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['tenant'] });
          toast.success(`Status updated successfully`);
        }
      });
    } catch (error) {
      console.error('Error updating Tenant status:', error);
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
          <DropdownMenuItem onClick={() => handleView(tenantId)}>
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdate(tenantId)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteModalOpen(true)}>
            Delete
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleStatus(tenantId)}
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
        message="Are you sure you want to delete this tenant?"
      />
    </>
  );
};

export default TenantActionsCell;
