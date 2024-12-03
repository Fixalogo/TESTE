import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Settings } from '../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export function SettingsDialog({ isOpen, onClose, settings, onSave }: SettingsDialogProps) {
  const [localSettings, setLocalSettings] = useState<Settings>(settings);
  const [newArtFinisher, setNewArtFinisher] = useState('');
  const [newDeliveryPerson, setNewDeliveryPerson] = useState('');

  const handleAddArtFinisher = () => {
    if (newArtFinisher && !localSettings.artFinishers.includes(newArtFinisher)) {
      setLocalSettings({
        ...localSettings,
        artFinishers: [...localSettings.artFinishers, newArtFinisher],
      });
      setNewArtFinisher('');
    }
  };

  const handleAddDeliveryPerson = () => {
    if (newDeliveryPerson && !localSettings.deliveryPeople.includes(newDeliveryPerson)) {
      setLocalSettings({
        ...localSettings,
        deliveryPeople: [...localSettings.deliveryPeople, newDeliveryPerson],
      });
      setNewDeliveryPerson('');
    }
  };

  const handleRemoveArtFinisher = (name: string) => {
    setLocalSettings({
      ...localSettings,
      artFinishers: localSettings.artFinishers.filter(af => af !== name),
    });
  };

  const handleRemoveDeliveryPerson = (name: string) => {
    setLocalSettings({
      ...localSettings,
      deliveryPeople: localSettings.deliveryPeople.filter(dp => dp !== name),
    });
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full bg-white rounded-xl shadow-lg">
          <div className="flex items-center justify-between p-6 border-b">
            <Dialog.Title className="text-lg font-semibold">Configurações do Sistema</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Arte Finalistas */}
            <div>
              <h3 className="text-base font-semibold mb-4">Arte Finalistas</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newArtFinisher}
                    onChange={(e) => setNewArtFinisher(e.target.value)}
                    placeholder="Nome do arte finalista"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleAddArtFinisher}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {localSettings.artFinishers.map((name) => (
                    <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span>{name}</span>
                      <button
                        onClick={() => handleRemoveArtFinisher(name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Pessoas que Entregam */}
            <div>
              <h3 className="text-base font-semibold mb-4">Pessoas que Entregam</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newDeliveryPerson}
                    onChange={(e) => setNewDeliveryPerson(e.target.value)}
                    placeholder="Nome da pessoa"
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    onClick={handleAddDeliveryPerson}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {localSettings.deliveryPeople.map((name) => (
                    <div key={name} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <span>{name}</span>
                      <button
                        onClick={() => handleRemoveDeliveryPerson(name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 p-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Salvar Alterações
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}