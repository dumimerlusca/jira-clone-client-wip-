import { ModalProps } from "@/types/modal";
import { Close } from "@mui/icons-material";
import { Modal } from "@mui/material";
import React, { PropsWithChildren } from "react";

export const ModalWrapper: React.FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal onClose={onClose} open={open}>
      <div className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 p-10 rounded-md w-screen max-w-[500px]">
        {children}
        <button onClick={onClose} className="absolute top-2 right-2">
          <Close />
        </button>
      </div>
    </Modal>
  );
};
