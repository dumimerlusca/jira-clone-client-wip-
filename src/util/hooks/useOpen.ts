"use client";

import { useCallback, useState } from "react";

export const useOpen = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return { open, setOpen, close, toggleOpen };
};
