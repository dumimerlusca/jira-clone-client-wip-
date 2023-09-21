import { Check, Close } from "@mui/icons-material";

export const ActionButtons = ({
  accept,
  reject,
}: {
  accept: () => void;
  reject: () => void;
}) => {
  return (
    <div className="absolute -bottom-1 right-0 translate-y-full flex gap-1">
      <button
        onClick={reject}
        className="bg-white rounded-md shadow-md p-1 flex items-center justify-center hover:bg-primary/5"
      >
        <Close />
      </button>
      <button
        onClick={accept}
        className="bg-white rounded-md shadow-md p-1 flex items-center justify-center hover:bg-gray-200"
      >
        <Check />
      </button>
    </div>
  );
};
