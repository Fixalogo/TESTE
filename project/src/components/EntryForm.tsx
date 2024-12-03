import React, { useState } from 'react';
import { ArtFinisher, WeekDay } from '../types';
import { notify } from '../utils/notifications';
import { CheckCircle2, Clock, Users, Hash } from 'lucide-react';

const artFinishers: ArtFinisher[] = ['Gustavo', 'Gleison', 'Heitor'];
const weekDays: WeekDay[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const timeSlots = Array.from({ length: 8 }, (_, i) => `${i + 10}:00`);

const initialFormState = {
  artFinisher: artFinishers[0],
  nrNumber: '',
  clientName: '',
  quantity: 1,
  day: weekDays[0],
  time: timeSlots[0],
};

export function EntryForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nrNumber || !formData.clientName) {
      notify.error('Preencha todos os campos obrigatórios');
      return;
    }

    onSubmit(formData);
    setFormData(initialFormState);
    notify.success('Tela registrada com sucesso!');
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-xl font-semibold text-white">Registro de Nova Tela</h2>
          <p className="text-indigo-100 mt-1">Preencha os dados para registrar uma nova tela</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Users className="w-4 h-4 mr-2" />
                Arte Finalista
              </label>
              <select
                value={formData.artFinisher}
                onChange={(e) => setFormData({ ...formData, artFinisher: e.target.value as ArtFinisher })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              >
                {artFinishers.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Hash className="w-4 h-4 mr-2" />
                Número NR
              </label>
              <input
                type="text"
                maxLength={6}
                value={formData.nrNumber}
                onChange={(e) => setFormData({ ...formData, nrNumber: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <Users className="w-4 h-4 mr-2" />
              Nome do Cliente
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Quantidade de Telas
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                Dia
              </label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value as WeekDay })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              >
                {weekDays.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Clock className="w-4 h-4 mr-2" />
                Horário
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 space-x-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Registrar Entrada</span>
          </button>
        </form>
      </div>
    </div>
  );
}