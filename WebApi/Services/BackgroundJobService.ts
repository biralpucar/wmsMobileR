import axios, { AxiosRequestConfig } from 'axios';
import { API_BASE_URL, DEFAULT_TIMEOUT, CURRENTLANGUAGE, getAuthToken } from '../baseUrl';
import { IBackgroundJobService } from '../Interfaces/IBackgroundJobService';
import { ApiResponse } from '../Models/ApiResponse';
import { ApiResponseErrorHelper } from '../Helpers/ApiResponseErrorHelper';

const api = axios.create({
  baseURL: API_BASE_URL + "/BackgroundJob",
  timeout: DEFAULT_TIMEOUT,
  headers: { 
    'Content-Type': 'application/json', 
    Accept: 'application/json',
    'X-Language': CURRENTLANGUAGE 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config : AxiosRequestConfig) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export class BackgroundJobService implements IBackgroundJobService {

    /**
     * Örnek fire-and-forget job - Hemen çalışır ve unutulur
     */
    async sendWelcomeEmail(userEmail: string, userName: string): Promise<void> {
        try {
            const response = await api.post('/send-welcome-email', {
                userEmail,
                userName
            });
            console.log(`Hoş geldin e-postası başarıyla gönderildi: ${userName}`);
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Örnek delayed job - Belirli bir süre sonra çalışır
     */
    async sendReminderEmail(userEmail: string, message: string, delayMinutes?: number): Promise<void> {
        try {
            const response = await api.post('/send-reminder-email', {
                userEmail,
                message,
                delayMinutes
            });
            console.log(`Hatırlatma e-postası planlandı: ${message}`);
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Örnek recurring job - Belirli aralıklarla tekrar eden iş
     */
    async scheduleDailyReport(cronExpression?: string): Promise<void> {
        try {
            const response = await api.post('/schedule-daily-report', {
                cronExpression: cronExpression || '0 0 * * *' // Her gün gece yarısı
            });
            console.log('Günlük rapor planlandı');
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Örnek continuation job - Başka bir iş tamamlandıktan sonra çalışır
     */
    async scheduleDataCleanup(parentJobId?: string): Promise<void> {
        try {
            const response = await api.post('/schedule-data-cleanup', {
                parentJobId
            });
            console.log('Veri temizleme işi planlandı');
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * Örnek batch job - Toplu işlem
     */
    async processInventoryUpdate(inventoryIds: number[]): Promise<void> {
        try {
            const response = await api.post('/process-inventory-update', {
                inventoryIds
            });
            console.log(`Envanter güncelleme işi planlandı. İşlenecek kayıt sayısı: ${inventoryIds.length}`);
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * İş durumunu kontrol et
     */
    async getJobStatus(jobId: string): Promise<any> {
        try {
            const response = await api.get(`/status/${jobId}`);
            return response.data;
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }

    /**
     * İşi iptal et
     */
    async cancelJob(jobId: string): Promise<void> {
        try {
            const response = await api.delete(`/cancel/${jobId}`);
            console.log(`İş iptal edildi: ${jobId}`);
        } catch (error) {
            return ApiResponseErrorHelper.create(error);
        }
    }
}

