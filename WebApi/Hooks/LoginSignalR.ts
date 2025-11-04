import { useEffect, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { API_BASE_URL } from '../baseUrl';

interface UseSignalRProps {
  onSessionInvalidated?: () => void;
}

export const useSignalR = ({ onSessionInvalidated }: UseSignalRProps) => {
  const connectionRef = useRef<signalR.HubConnection | null>(null);


const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  const sessionId = localStorage.getItem("sessionId");
  return !!(token && sessionId);
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("sessionId");
  window.location.href = "/login";
};

  useEffect(() => {
    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('sessionId');
    
    // isAuthenticated fonksiyonunu kullanarak tutarlılık sağla
    if (!isAuthenticated()) return;

    const startConnection = async () => {
      try {
        const connection = new signalR.HubConnectionBuilder()
          .withUrl(`${API_BASE_URL}/authHub`, {
            accessTokenFactory: () => token!, // JWT token'ı query string yerine header olarak gönderir
            withCredentials: true,
          })
          .withAutomaticReconnect()
          .build();

        connectionRef.current = connection;

        // Force logout listener
        connection.on('ForceLogout', (message: string) => {
          console.log('Force logout received:', message);
          logout(); // authServis logout fonksiyonunu kullan
          if (onSessionInvalidated) onSessionInvalidated();
        });

        await connection.start();
        console.log('SignalR connected successfully');

        // Register session after connection
        try {
          //await connection.invoke('RegisterSession', sessionId);
          console.log('Session registered:', sessionId);
        } catch (error) {
          console.warn('Failed to register session:', error);
        }

      } catch (error: any) {
        // Hub henüz hazır değilse veya bağlantı sorunları için daha iyi hata yönetimi
        if (
          error?.message?.includes('404') ||
          error?.message?.includes('Not Found') ||
          error?.message?.includes('Failed to fetch') ||
          error?.message?.includes('401') ||
          error?.message?.includes('Unauthorized')
        ) {
          console.log('SignalR hub not available yet or unauthorized, will retry later');
        } else if (error?.message?.includes('NetworkError') || error?.message?.includes('fetch')) {
          console.log('Network error during SignalR connection, will retry automatically');
        } else {
          console.warn('SignalR connection failed:', error?.message || error);
        }
        
        // Bağlantı başarısız olursa connection referansını temizle
        if (connectionRef.current) {
          connectionRef.current = null;
        }
      }
    };

    startConnection();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(() => {});
        connectionRef.current = null;
      }
    };
  }, [onSessionInvalidated]);

  return connectionRef.current;
};
