import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  postId: string;
  onClose: () => void;
  onConfirm: () => void;
}

const PostDeleteModal = ({
  isOpen,
  postId,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post {postId}? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="bg-red-500 text-white" onClick={onConfirm}>
            Delete
          </Button>
          <Button className="bg-gray-300 text-black" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostDeleteModal;
