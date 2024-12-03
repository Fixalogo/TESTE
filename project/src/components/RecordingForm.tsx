import React, { useState } from 'react';
import { Screen } from '../types';
import { SearchBar } from './SearchBar';
import { StatusBadge } from './StatusBadge';

interface RecordingFormProps {
  screens: Screen[];
  onSubmit: (screenId: string, data: { date: string; recordedBy: string }) => void;
}

export function RecordingForm({ screens, onSubmit }: RecordingFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    recordedBy: '',
  });

  // Sort screens by creation date (newest first)
  const sortedScreens = [...screens].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const filteredScreens = searchTerm
    ? sortedScreens.filter(screen =>
        screen.nrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : sortedScreens;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedScreen) {
      onSubmit(selectedScreen.id, formData);
      setSelectedScreen(null);
      setSearchTerm('');
      setFormData({ date: new Date().toISOString().split('T')[0], recordedBy: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="mb-8">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por Cliente ou NR"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredScreens.map((screen) => (
                <tr key={screen.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(screen.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{screen.nrNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{screen.clientName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={screen.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setSelectedScreen(screen)}
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

      {selectedScreen && (
        <div className="mt-8">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
            <div className="border-b border-gray-200 pb-4">
              <h3 className="text-lg font-medium text-gray-900">Detalhes da Tela Selecionada</h3>
              <p className="mt-2 text-sm text-gray-600">
                NR: {selectedScreen.nrNumber} - Cliente: {selectedScreen.clientName}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Gravação</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Registrado por</label>
              <input
                type="text"
                value={formData.recordedBy}
                onChange={(e) => setFormData({ ...formData, recordedBy: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrar Gravação
            </button>
          </form>
        </div>
      )}
    </div>
  );
}