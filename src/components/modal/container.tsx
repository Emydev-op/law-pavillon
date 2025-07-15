import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import useRemovePointerEvent from "@/hooks/use-remove-pointer-event";

interface ModalContainerProps {
  title?: string | React.ReactNode;
  show: boolean;
  hasCloseButton?: boolean;
  handleClose?: () => void;
  children?: React.ReactNode;
  modalClass?: string;
  customWidth?: string;
}

export default function ModalContainer({
  show,
  handleClose,
  children,
  modalClass,
  customWidth,
  hasCloseButton = false,
}: ModalContainerProps) {
  const { handleRemovePointerEvent } = useRemovePointerEvent(show);

  handleRemovePointerEvent();

  return (
    <>
      <AlertDialog open={show} onOpenChange={handleClose}>
        <AlertDialogContent
          className={cn(
            customWidth
              ? customWidth
              : "rounded-[1.6rem] md:max-w-[33.625rem] lg:max-w-[32.5rem]",
            modalClass
          )}
        >
          <AlertDialogTitle className="hidden sr-only" />
          <AlertDialogDescription className="hidden sr-only" />
          {hasCloseButton && (
            <span
              className="absolute right-6 top-5 cursor-pointer text-[#8F8F8F]"
              onClick={handleClose}
            >
              <X width={22} height={22} />
            </span>
          )}
          {children}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
