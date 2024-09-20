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
import { Row } from '@tanstack/react-table';

interface EmailSettingData {
  id: number;
  mailDeliver: string;
  mailHost: string;
  mailPort: string;
  mailUsername: string;
  mailPassword: string;
  mailEncryption: string;
  mailFromAddress: string;
  mailFromName: string;
}

interface EmailSettingActionsCellProps {
  row: Row<EmailSettingData>; // Use Row type with the data type
}

const EmailSettingActionsCell: React.FC<EmailSettingActionsCellProps> = ({
  row
}) => {
  const id = row.getValue('id') as number;
  const router = useRouter();

  const handleView = (id: number) => {
    router.push(`/settings/email-setting/view-email-setting/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/settings/email-setting/update-email-setting/${id}`);
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
        {/* Add more actions here if needed */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default EmailSettingActionsCell;
