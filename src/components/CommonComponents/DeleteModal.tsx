import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface DeleteModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

export function DeleteModal({
  modalOpen,
  onClose,
  onConfirm,
  message
}: DeleteModalProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent className="h-52">
        <DialogHeader className="pt-10 text-left">
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex w-full flex-row justify-start gap-2">
          <Button
            type="button"
            onClick={onClose}
            className="text-dark hover:text-dark border border-none bg-secondary hover:bg-opacity-80"
          >
            Cancel
          </Button>
          <Button type="button" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
