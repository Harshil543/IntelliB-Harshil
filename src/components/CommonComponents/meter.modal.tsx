import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

import MeterForm from '../forms/meter.form';
import { DialogClose } from '@radix-ui/react-dialog';

interface MeterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  leasableUnitId: number | null;
  id?: number;
}

export function MeterFormModal({
  isOpen,
  onClose,
  leasableUnitId,
  id
}: MeterFormModalProps) {
  console.log('meter a', leasableUnitId, 'id', id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register Meter</DialogTitle>
        </DialogHeader>
        <MeterForm
          leasableUnitId={leasableUnitId}
          onClose={onClose}
          closeButton={
            <DialogClose asChild>
              <Button
                type="button"
                className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
                onClick={onClose}
              >
                Cancel
              </Button>
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
