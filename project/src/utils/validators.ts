import { z } from 'zod';
import { ArtFinisher, WeekDay, DeliveryMethod } from '../types';

export const entryFormSchema = z.object({
  artFinisher: z.enum(['Gustavo', 'Gleison', 'Heitor'] as const),
  nrNumber: z.string().length(6, 'O número NR deve ter exatamente 6 caracteres'),
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  quantity: z.number().min(1, 'Quantidade deve ser maior que zero'),
  day: z.enum(['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'] as const),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):00$/, 'Horário inválido'),
});

export const recordingFormSchema = z.object({
  date: z.string(),
  recordedBy: z.string().min(1, 'Nome do responsável é obrigatório'),
});

export const deliveryFormSchema = z.object({
  method: z.enum(['Motoboy', 'Cliente', 'Correio'] as const),
  seller: z.string().min(1, 'Nome do vendedor é obrigatório'),
});