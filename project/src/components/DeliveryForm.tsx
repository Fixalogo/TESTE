import React, { useState } from 'react';
import { DeliveryMethod, Screen } from '../types';
import { SearchBar } from './SearchBar';
import { StatusBadge } from './StatusBadge';

const deliveryMethods: DeliveryMethod[] = ['Motoboy', 'Cliente', 'Correio'];

interface DeliveryFormProps {
  screens: Screen[];
  onSubmit: (screenId: string, data: { method: DeliveryMethod; seller: string }) => void;
}

export function DeliveryForm({ screens, onSubmit }: DeliveryFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));
  const [formData, setFormData] = useState({
    deliveryMethod: deliveryMethods[0],
    seller: '',
  });

  // Filter screens by month and sort by creation date
  const filteredAndSortedScreens = screens
    .filter(screen => screen.createdAt.startsWith(filterMonth))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Then apply search filter if there's a search term
  const displayedScreens = searchTerm
    ? filteredAndSortedScreens.filter(screen =>
        screen.nrNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        screen.clientName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredAndSortedScreens;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedScreen) {
      onSubmit(selectedScreen.id, {
        method: formData.deliveryMethod as DeliveryMethod,
        seller: formData.seller,
      });
      setSelectedScreen(null);
      setSearchTerm('');
      setFormData({ deliveryMethod: deliveryMethods[0], seller: '' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Mês</label>
          <input
            type="month"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        
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
              {displayedScreens.map((screen) => (
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
              <label className="block text-sm font-medium text-gray-700">Método de Entrega</label>
              <select
                value={formData.deliveryMethod}
                onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value as DeliveryMethod })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {deliveryMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Vendedor</label>
              <input
                type="text"
                value={formData.seller}
                onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Registrar Retirada
            </button>
          </form>
        </div>
      )}
    </div>
  );
}