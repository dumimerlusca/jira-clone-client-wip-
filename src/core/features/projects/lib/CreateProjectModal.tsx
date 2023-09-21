import { ModalWrapper } from "@/components/modal";
import { ModalProps } from "@/types/modal";
import { CreateProjectForm } from "./CreateProjectForm";

export const CreateProjectModal = ({ open, onClose }: ModalProps) => {
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <CreateProjectForm
        onSuccess={() => {
          setTimeout(() => {
            onClose();
          }, 1000);
        }}
      />
    </ModalWrapper>
  );
};
