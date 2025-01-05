import Box from '@mui/material/Box';
import * as React from 'react';
import Modal from '@mui/material/Modal';
import { ReactNode } from 'react';

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function CommonModal({
  onClose,
  open,
  children,
  className,
}: CommonModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md w-full max-w-lg ${className}`}
      >
        {children}
      </div>
    </Modal>
  );
}
