// src/components/LeasableUnitActionCell.tsx

import React from 'react';
import { useRouter } from 'next/navigation';
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

interface LeasableUnitActionCellProps {
  id: number;
  status: string;
}

const LeasableUnitActionCell: React.FC<LeasableUnitActionCellProps> = ({
  id
}) => {
  const router = useRouter();

  const handleView = () => {
    router.push(`/leasable-unit/view-leasable-unit/${id}`);
  };

  const handleUpdate = () => {
    router.push(`/leasable-unit/update-leasable-unit/${id}`);
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LeasableUnitActionCell;
