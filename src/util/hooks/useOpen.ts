import { useCallback, useState } from "react";

export const useOpen = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const close = useCallback(() => {
    setOpen(false);
  }, []);
  return { open, setOpen, close };
};
