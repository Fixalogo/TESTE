import React, { useState } from 'react';
import { Screen } from '../types';

export function ReportView({ screens }: { screens: Screen[] }) {
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));

  const filteredScreens = screens.filter(screen => 
    screen.createdAt.startsWith(filterMonth)
  );

  const getStatusClass = (status: Screen['status']) => {
    switch (status) {
      case 'Em Produção':
        return 'text-yellow-600 bg-yellow-100';
      case 'Gravada':
        return 'text-blue-600 bg-blue-100';
      case 'Retirada':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filtrar por Mês</label>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-4 bg-white rounded-lg shadow">
        <div className="sm:flex sm:items-center px-4 py-5 sm:px-6">
          <div className="sm:flex-auto">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Resumo do Mês
            </h3>
            <p className="mt-2 text-sm text-gray-700">
              Total de Telas: {filteredScreens.length}
            </p>
          </div>
        </div>

        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">NR</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cliente</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Arte Finalista</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data Criação</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Prazo</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Detalhes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredScreens.map((screen) => (
                    <tr key={screen.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{screen.nrNumber}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{screen.clientName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{screen.artFinisher}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(screen.status)}`}>
                          {screen.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(screen.createdAt).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {`${screen.deadline.day} ${screen.deadline.time}`}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {screen.recordingDate && (
                          <div>Gravado em: {new Date(screen.recordingDate).toLocaleDateString()}</div>
                        )}
                        {screen.delivery && (
                          <div>
                            Retirado via: {screen.delivery.method}
                            <br />
                            Vendedor: {screen.delivery.seller}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}