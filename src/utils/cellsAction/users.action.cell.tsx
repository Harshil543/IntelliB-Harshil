'use client';
// components/PropertyUserActionsCell.tsx
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

interface PropertyUserActionsCellProps {
  propertyUserId: number;
  currentStatus: string;
}

const PropertyUserActionsCell: React.FC<PropertyUserActionsCellProps> = ({
  propertyUserId
}) => {
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/property-user/view-property-user/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/property-user/update-property-user/${id}`);
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
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdate(propertyUserId)}>
          Delete
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PropertyUserActionsCell;
