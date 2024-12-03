import React from 'react';
import { ScreenStatus } from '../types';

interface StatusBadgeProps {
  status: ScreenStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusClass = (status: ScreenStatus) => {
    switch (status) {
      case 'Em Produção':
        return 'text-yellow-700 bg-yellow-50 ring-yellow-600/20';
      case 'Gravada':
        return 'text-blue-700 bg-blue-50 ring-blue-600/20';
      case 'Retirada':
        return 'text-green-700 bg-green-50 ring-green-600/20';
      default:
        return 'text-gray-600 bg-gray-50 ring-gray-500/10';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusClass(status)}`}>
      {status}
    </span>
  );
}