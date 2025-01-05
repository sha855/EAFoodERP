import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function NotificationMessage({
  message,
  type,
  onClose,
}: NotificationProps) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center justify-between p-4 rounded shadow-lg text-white ${bgColor}`}
      style={{ minWidth: '300px' }}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-xl">
        &times;
      </button>
    </div>
  );
}
