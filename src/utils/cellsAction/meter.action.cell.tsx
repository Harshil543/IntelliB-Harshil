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

interface MeterFormValues {
  meterType: string;
  meterNumber: string;
  installationDate: Date;
  leasableUnitId: number | null;
  status: string;
}

interface MeterActionCellProps {
  row: MeterFormValues;
}

const MeterActionCell: React.FC<MeterActionCellProps> = ({ row }) => {
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
          initialValues={row}
          leasableUnitId={row.leasableUnitId}
        />
      ) : null}
    </>
  );
};

export default MeterActionCell;
