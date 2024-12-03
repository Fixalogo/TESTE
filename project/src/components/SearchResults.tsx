import React from 'react';
import { Screen, DeliveryMethod } from '../types';

interface SearchResultsProps {
  screens: Screen[];
  onSelectScreen: (screen: Screen) => void;
}

export function SearchResults({ screens, onSelectScreen }: SearchResultsProps) {
  if (screens.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        Nenhuma tela encontrada
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">NR</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {screens.map((screen) => (
              <tr key={screen.id}>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{screen.nrNumber}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{screen.clientName}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{screen.status}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <button
                    onClick={() => onSelectScreen(screen)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Selecionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}