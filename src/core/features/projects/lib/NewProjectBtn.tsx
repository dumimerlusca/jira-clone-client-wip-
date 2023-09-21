"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import { CreateProjectModal } from "./CreateProjectModal";

export const NewProjectBtn = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateProjectModal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className={className}
        variant="outlined"
        color="secondary"
      >
        New Project
      </Button>
    </>
  );
};
