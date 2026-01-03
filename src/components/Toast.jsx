import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgColor = toast.type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3`}>
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
