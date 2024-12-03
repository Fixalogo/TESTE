import React, { useState } from 'react';
import { Tabs } from './components/Tabs';
import { EntryForm } from './components/EntryForm';
import { RecordingForm } from './components/RecordingForm';
import { DeliveryForm } from './components/DeliveryForm';
import { ReportView } from './components/ReportView';
import { SettingsDialog } from './components/SettingsDialog';
import { Toaster } from './components/Toaster';
import { Screen, DeliveryMethod, Settings } from './types';
import { updateScreenStatus } from './utils/screenUtils';
import { notify } from './utils/notifications';
import { LayoutGrid, Settings as SettingsIcon } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('Entrada');
  const [screens, setScreens] = useState<Screen[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    artFinishers: ['Gustavo', 'Gleison', 'Heitor'],
    deliveryPeople: ['João', 'Maria', 'Pedro'],
  });

  const handleEntrySubmit = (data: any) => {
    const newScreen: Screen = {
      id: Date.now().toString(),
      nrNumber: data.nrNumber,
      clientName: data.clientName,
      quantity: data.quantity,
      artFinisher: data.artFinisher,
      deadline: {
        day: data.day,
        time: data.time,
      },
      status: 'Em Produção',
      createdAt: new Date().toISOString(),
    };
    setScreens([...screens, newScreen]);
    setActiveTab('Gravação');
  };

  const handleRecordingSubmit = (screenId: string, data: { date: string; recordedBy: string }) => {
    setScreens(
      updateScreenStatus(screens, screenId, 'Gravada', {
        recordingDate: data.date,
        recordedBy: data.recordedBy,
      })
    );
    notify.success('Gravação registrada com sucesso!');
  };

  const handleDeliverySubmit = (
    screenId: string,
    data: { method: DeliveryMethod; deliveryPerson: string }
  ) => {
    setScreens(
      updateScreenStatus(screens, screenId, 'Retirada', {
        delivery: {
          method: data.method,
          deliveryPerson: data.deliveryPerson,
          date: new Date().toISOString(),
        },
      })
    );
    notify.success('Retirada registrada com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <LayoutGrid className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">Sistema de Controle de Telas</h1>
          </div>
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <SettingsIcon className="w-4 h-4 mr-2" />
            Configurações
          </button>
        </div>
        
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-8">
          {activeTab === 'Entrada' && (
            <EntryForm onSubmit={handleEntrySubmit} artFinishers={settings.artFinishers} />
          )}
          {activeTab === 'Gravação' && (
            <RecordingForm
              screens={screens.filter(s => s.status === 'Em Produção')}
              onSubmit={handleRecordingSubmit}
              deliveryPeople={settings.deliveryPeople}
            />
          )}
          {activeTab === 'Retirada' && (
            <DeliveryForm
              screens={screens.filter(s => s.status === 'Gravada')}
              onSubmit={handleDeliverySubmit}
              deliveryPeople={settings.deliveryPeople}
            />
          )}
          {activeTab === 'Relatórios' && <ReportView screens={screens} />}
        </div>
      </div>

      <SettingsDialog
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={setSettings}
      />
      
      <Toaster />
    </div>
  );
}

export default App;