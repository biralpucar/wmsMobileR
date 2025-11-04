// GrHeader API Servisi
// Mal kabul başlık işlemleri için API çağrıları

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
  GrHeader,
  CreateGrHeader,
  UpdateGrHeader,
  GrHeaderResponse
} from '../malKabulClass/grHeaderClass';
import { parseArrayResponse, parseObjectResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * Tüm GrHeader kayıtlarını getirir
 * API Endpoint: GET /api/GrHeader
 */
export const getGrHeaders = async (): Promise<GrHeaderResponse> => {
  try {
    console.log('GrHeader kayıtları getiriliyor...');
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.HEADER}`, { headers });
    
    const rawData = response.data;
    const data = parseArrayResponse<GrHeader>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: `${data.length} adet kayıt bulundu` };
  } catch (error) {
    console.error('GrHeader getirilemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * ID'ye göre GrHeader kaydını getirir
 * API Endpoint: GET /api/GrHeader/{id}
 */
export const getGrHeaderById = async (id: number): Promise<GrHeaderResponse> => {
  try {
    console.log(`GrHeader kaydı getiriliyor: ID=${id}`);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.HEADER}/${id}`, { headers });
    
    const rawData = response.data;
    const data = parseObjectResponse<GrHeader>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: 'Kayıt başarıyla getirildi' };
  } catch (error) {
    console.error('GrHeader getirilemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * Yeni GrHeader kaydı oluşturur
 * API Endpoint: POST /api/GrHeader
 */
export const createGrHeader = async (createData: CreateGrHeader): Promise<GrHeaderResponse> => {
  try {
    console.log('GrHeader kaydı oluşturuluyor...', createData);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.HEADER}`, createData, { headers });
    
    const rawData = response.data;
    const data = parseObjectResponse<GrHeader>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: 'Kayıt başarıyla oluşturuldu' };
  } catch (error) {
    console.error('GrHeader oluşturulamadı:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * Mevcut GrHeader kaydını günceller
 * API Endpoint: PUT /api/GrHeader/{id}
 */
export const updateGrHeader = async (id: number, updateData: UpdateGrHeader): Promise<GrHeaderResponse> => {
  try {
    console.log(`GrHeader kaydı güncelleniyor: ID=${id}`, updateData);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.put(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.HEADER}/${id}`, updateData, { headers });
    
    const rawData = response.data;
    const data = parseObjectResponse<GrHeader>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: 'Kayıt başarıyla güncellendi' };
  } catch (error) {
    console.error('GrHeader güncellenemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * GrHeader kaydını siler (soft delete)
 * API Endpoint: DELETE /api/GrHeader/{id}
 */
export const deleteGrHeader = async (id: number): Promise<GrHeaderResponse> => {
  try {
    console.log(`GrHeader kaydı siliniyor: ID=${id}`);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.HEADER}/${id}`, { headers });
    
    return { success: true, data: [], message: 'Kayıt başarıyla silindi' };
  } catch (error) {
    console.error('GrHeader silinemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

// Export default
export default {
  getGrHeaders,
  getGrHeaderById,
  createGrHeader,
  updateGrHeader,
  deleteGrHeader,
};


