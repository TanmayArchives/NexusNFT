import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-md ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
      <p>{message}</p>
      <button onClick={onClose} className="mt-2 px-2 py-1 bg-white text-black rounded-md">Close</button>
    </div>
  );
};

export default Notification;
