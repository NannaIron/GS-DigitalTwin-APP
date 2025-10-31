import axios from 'axios';
import { authApi } from './auth.service';

export type Sensor = {
  id: string;
  name: string;
  type: string;
  description?: string;
  unit?: string;
  status?: string;
  statusDescription?: string;
  minValue?: number | null;
  maxValue?: number | null;
  history?: number[];
  value?: number | null;
};

export type ReadingPayload = {
  sensorId: string;
  readingValue: number;
  timestamp: string; 
};

const api = authApi;

/**
 * POST /readings
 */
export async function postReading(payload: ReadingPayload) {
  try {
    const res = await api.post('/readings', payload);
    return res.data;
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response) {
      throw err.response.data || { status: err.response.status, message: err.message };
    }
    throw err;
  }
}

/**
 * GET /readings
 */
export async function getReadings(): Promise<Sensor[]> {
  const res = await api.get('/readings');
  return res.data;
}

/**
 * GET /readings/{id}
 */
export async function getReadingById(id: string): Promise<Sensor> {
  const res = await api.get(`/readings/${id}`);
  return res.data;
}

export default {
  postReading,
  getReadings,
  getReadingById,
};