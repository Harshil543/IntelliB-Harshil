// src/components/CompanyActionCell.tsx
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
import { statusCompany } from '@/services/company.service';

interface CompanyActionCellProps {
  id: number;
  status: string;
}

const CompanyActionCell: React.FC<CompanyActionCellProps> = ({
  id,
  status
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const statusMutation = useMutation({
    mutationFn: (id: number) => statusCompany(id)
  });

  const handleView = (id: number) => {
    router.push(`/company/view-company/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/company/update-company/${id}`);
  };

  const handleStatus = async (id: number) => {
    try {
      statusMutation.mutate(id, {
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
        <DropdownMenuItem onClick={() => handleView(id)}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdate(id)}>
          Update
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => handleStatus(id)}
          className="cursor-pointer"
        >
          {status === 'active' ? 'In-Activate' : 'Activate'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyActionCell;
