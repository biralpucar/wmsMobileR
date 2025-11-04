// GrLine API Servisi
// Mal kabul satır işlemleri için API çağrıları

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_ENDPOINTS } from '../baseUrl';
import {
  GrLine,
  CreateGrLine,
  UpdateGrLine,
  GrLineResponse
} from '../malKabulClass/grLineClass';
import { parseArrayResponse, parseObjectResponse, getApiErrorMessage } from '../utils/apiResponseParser';

/**
 * Tüm GrLine kayıtlarını getirir
 * API Endpoint: GET /api/GrLine
 */
export const getGrLines = async (): Promise<GrLineResponse> => {
  try {
    console.log('GrLine kayıtları getiriliyor...');
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.LINE}`, { headers });
    
    const rawData = response.data;
    const data = parseArrayResponse<GrLine>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: `${data.length} adet kayıt bulundu` };
  } catch (error) {
    console.error('GrLine getirilemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * ID'ye göre GrLine kaydını getirir
 * API Endpoint: GET /api/GrLine/{id}
 */
export const getGrLineById = async (id: number): Promise<GrLineResponse> => {
  try {
    console.log(`GrLine kaydı getiriliyor: ID=${id}`);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.LINE}/${id}`, { headers });
    
    const rawData = response.data;
    const data = parseObjectResponse<GrLine>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: 'Kayıt başarıyla getirildi' };
  } catch (error) {
    console.error('GrLine getirilemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * Header ID'ye göre GrLine kayıtlarını getirir
 * API Endpoint: GET /api/GrLine/by-header/{headerId}
 */
export const getGrLinesByHeaderId = async (headerId: number): Promise<GrLineResponse> => {
  try {
    console.log(`GrLine kayıtları getiriliyor: HeaderID=${headerId}`);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.LINE}/by-header/${headerId}`, { headers });
    
    const rawData = response.data;
    const data = parseArrayResponse<GrLine>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: `${data.length} adet kayıt bulundu` };
  } catch (error) {
    console.error('GrLine getirilemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * Yeni GrLine kaydı oluşturur
 * API Endpoint: POST /api/GrLine
 */
export const createGrLine = async (createData: CreateGrLine): Promise<GrLineResponse> => {
  try {
    console.log('GrLine kaydı oluşturuluyor...', createData);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.LINE}`, createData, { headers });
    
    const rawData = response.data;
    const data = parseObjectResponse<GrLine>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: 'Kayıt başarıyla oluşturuldu' };
  } catch (error) {
    console.error('GrLine oluşturulamadı:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * Mevcut GrLine kaydını günceller
 * API Endpoint: PUT /api/GrLine/{id}
 */
export const updateGrLine = async (id: number, updateData: UpdateGrLine): Promise<GrLineResponse> => {
  try {
    console.log(`GrLine kaydı güncelleniyor: ID=${id}`, updateData);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.put(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.LINE}/${id}`, updateData, { headers });
    
    const rawData = response.data;
    const data = parseObjectResponse<GrLine>(rawData);
    
    if (data === null) {
      return { success: false, data: [], error: getApiErrorMessage(rawData) };
    }
    
    return { success: true, data: data, message: 'Kayıt başarıyla güncellendi' };
  } catch (error) {
    console.error('GrLine güncellenemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

/**
 * GrLine kaydını siler (soft delete)
 * API Endpoint: DELETE /api/GrLine/{id}
 */
export const deleteGrLine = async (id: number): Promise<GrLineResponse> => {
  try {
    console.log(`GrLine kaydı siliniyor: ID=${id}`);
    
    const token = await AsyncStorage.getItem('jwt_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await axios.delete(`${API_BASE_URL}${API_ENDPOINTS.GOODS_RECEIPT.LINE}/${id}`, { headers });
    
    return { success: true, data: [], message: 'Kayıt başarıyla silindi' };
  } catch (error) {
    console.error('GrLine silinemedi:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Bilinmeyen hata' };
  }
};

// Export default
export default {
  getGrLines,
  getGrLineById,
  getGrLinesByHeaderId,
  createGrLine,
  updateGrLine,
  deleteGrLine,
};


