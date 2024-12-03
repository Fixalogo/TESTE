export type ArtFinisher = string;
export type WeekDay = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta' | 'Sábado';
export type DeliveryMethod = 'Motoboy' | 'Cliente' | 'Correio';
export type ScreenStatus = 'Em Produção' | 'Gravada' | 'Retirada';
export type DeliveryPerson = string;

export interface Screen {
  id: string;
  nrNumber: string;
  clientName: string;
  quantity: number;
  artFinisher: ArtFinisher;
  deadline: {
    day: WeekDay;
    time: string;
  };
  recordingDate?: string;
  recordedBy?: string;
  status: ScreenStatus;
  delivery?: {
    method: DeliveryMethod;
    deliveryPerson: string;
    date: string;
  };
  createdAt: string;
}

export interface Settings {
  artFinishers: string[];
  deliveryPeople: string[];
}