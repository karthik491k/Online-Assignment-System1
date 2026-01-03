import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'submitted':
        return 'badge-submitted';
      case 'reviewed':
        return 'badge-reviewed';
      case 'graded':
        return 'badge-graded';
      case 'overdue':
        return 'badge-overdue';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`badge ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
