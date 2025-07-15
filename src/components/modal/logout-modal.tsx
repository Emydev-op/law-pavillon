import { Button } from "../ui/button";
import ModalContainer from "./container";

interface LogoutModalProps {
  show: boolean;
  handleClose: () => void;
  handleLogout?: () => void;
  loading?: boolean;
}

export default function LogoutModal({
  show,
  handleClose,
  handleLogout,
  loading = false,
}: LogoutModalProps) {
  return (
    <ModalContainer
      show={show}
      hasCloseButton
      modalClass="lg:max-w-[29rem]"
      handleClose={handleClose! && handleClose}
    >
      <div className="">
        <h1 className="p-5 font-bold text-2xl">Want to Logout?</h1>
        <p className="px-5 block mt- text-gray-600 text-[1rem] font-semibold">
          Are you sure you want to log out? Please confirm by clicking
          &quot;Yes, logout&quot; or &quot;Cancel&quot;.
        </p>
        <div className="mt-4 flex justify-end">
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="h-10 rounded-md px-6 "
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant={"default"}
              className="h-10 rounded-md px-6 min-w-31"
              onClick={handleLogout}
              loading={loading}
            >
              Yes, Logout
            </Button>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
}
