import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface LogoutModalProps {
  modalOpen: boolean;
  onClose: () => void;
  onPress: () => void;
}
export function LogoutModal({ modalOpen, onClose, onPress }: LogoutModalProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={onClose}>
      <DialogContent className="h-52 sm:max-w-md">
        <DialogHeader className="pt-10">
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            onClick={onClose}
            className="text-dark hover:text-dark w-fit bg-secondary hover:bg-opacity-80"
          >
            Cancel
          </Button>
          <Button type="button" onClick={onPress}>
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
