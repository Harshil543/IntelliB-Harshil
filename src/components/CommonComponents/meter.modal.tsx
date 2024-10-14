import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import MeterForm from '../forms/meter.form';
import { DialogClose } from '@radix-ui/react-dialog';
interface MeterFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  leasableUnitId: number | null;
  initialValues?: any;
}

export function MeterFormModal({
  isOpen,
  onClose,
  leasableUnitId,
  initialValues
}: MeterFormModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <MeterForm
          leasableUnitId={leasableUnitId}
          onClose={onClose}
          initialValues={initialValues}
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
