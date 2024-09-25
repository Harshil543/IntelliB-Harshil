// src/components/MeterActionCell.tsx
import React, { useState } from 'react';
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
import { MeterFormModal } from '@/components/CommonComponents/meter.modal';

interface MeterActionCellProps {
  id: number;
  meterType: string;
  meterNumber: string;
  installationDate: Date;
  status: string;
  leasableUnitId: number;
}

const MeterActionCell: React.FC<MeterActionCellProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = () => {
    setIsOpen(true);
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
          <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>

      {isOpen ? (
        <MeterFormModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          leasableUnitId={5}
          id={id}
        />
      ) : null}
    </>
  );
};

export default MeterActionCell;
