"use client";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { CloseOutlined } from "@mui/icons-material";

const Dialogue = ({
  open,
  handleClose,
  hasCloseButton,
  dialogueTitle,
  child,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <div className="flex justify-between items-center mx-auto w-11/12 border-b border-[#CECECE]">
        <DialogTitle>{dialogueTitle}</DialogTitle>
        {hasCloseButton && (
          <CloseOutlined onClick={handleClose} cursor="pointer" />
        )}
      </div>

      <DialogContent>{child}</DialogContent>
    </Dialog>
  );
};

export default Dialogue;
