import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface ChatMessagesProps {
  chatData: any;
  onBack: () => void;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'file' | 'image';
  fileName?: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ chatData, onBack }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const flatListRef = useRef<FlatList>(null);
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = isDarkMode ? '#3B82F6' : '#2563EB';

  // Örnek mesaj verileri
  useEffect(() => {
    const sampleMessages: Message[] = [
      {
        id: '1',
        text: 'Merhaba, depo transfer işlemi hakkında konuşabilir miyiz?',
        timestamp: '09:30',
        isOwn: false,
        status: 'read',
        type: 'text'
      },
      {
        id: '2',
        text: 'Tabii ki! Hangi depo transferi hakkında konuşmak istiyorsunuz?',
        timestamp: '09:32',
        isOwn: true,
        status: 'read',
        type: 'text'
      },
      {
        id: '3',
        text: 'A deposundan B deposuna yapılacak olan transfer işlemi için onay bekliyoruz.',
        timestamp: '09:35',
        isOwn: false,
        status: 'read',
        type: 'text'
      },
      {
        id: '4',
        text: 'Transfer listesini kontrol ettim, her şey uygun görünüyor. Onaylıyorum.',
        timestamp: '09:40',
        isOwn: true,
        status: 'read',
        type: 'text'
      },
      {
        id: '5',
        text: 'Teşekkürler! Transfer işlemini başlatıyorum.',
        timestamp: '09:42',
        isOwn: false,
        status: 'read',
        type: 'text'
      },
      {
        id: '6',
        text: 'Transfer_Raporu_20241201.pdf',
        timestamp: '14:25',
        isOwn: false,
        status: 'delivered',
        type: 'file',
        fileName: 'Transfer_Raporu_20241201.pdf'
      },
      {
        id: '7',
        text: 'Depo transfer işlemi tamamlandı, kontrol edebilirsiniz.',
        timestamp: '14:30',
        isOwn: false,
        status: 'sent',
        type: 'text'
      }
    ];
    setMessages(sampleMessages);
  }, []);

  const sendMessage = () => {
    if (messageText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      isOwn: true,
      status: 'sent',
      type: 'text'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');
    
    // Auto scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return 'checkmark';
      case 'delivered':
        return 'checkmark-done';
      case 'read':
        return 'checkmark-done';
      default:
        return 'time';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'read':
        return '#3B82F6';
      case 'delivered':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View className={`mb-4 ${item.isOwn ? 'items-end' : 'items-start'}`}>
      <View className={`max-w-xs px-4 py-3 rounded-2xl ${
        item.isOwn 
          ? 'bg-blue-500 rounded-br-md' 
          : 'border rounded-bl-md'
      }`}
      style={{
        backgroundColor: item.isOwn ? '#3B82F6' : cardBg,
        borderColor: item.isOwn ? 'transparent' : borderColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
      }}>
        
        {item.type === 'file' ? (
          <TouchableOpacity 
            className="flex-row items-center"
            onPress={() => Alert.alert('Dosya', 'Dosya indirme özelliği yakında eklenecek.')}
          >
            <View className={`w-10 h-10 rounded-lg items-center justify-center mr-3 ${
              item.isOwn ? 'bg-blue-400' : ''
            }`}
            style={{ backgroundColor: item.isOwn ? '#2563EB' : (isDarkMode ? '#374151' : '#F3F4F6') }}>
              <Ionicons 
                name="document-text" 
                size={20} 
                color={item.isOwn ? 'white' : '#6B7280'} 
              />
            </View>
            <View className="flex-1">
              <Text className={`text-sm font-medium ${
                item.isOwn ? 'text-white' : ''
              }`} 
              style={{ color: item.isOwn ? 'white' : textColor }}
              numberOfLines={1}>
                {item.fileName}
              </Text>
              <Text className={`text-xs ${
                item.isOwn ? 'text-blue-100' : ''
              }`}
              style={{ color: item.isOwn ? '#DBEAFE' : (textColor + '80') }}>
                PDF Dosyası
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <Text className={`text-base ${
            item.isOwn ? 'text-white' : ''
          }`}
          style={{ color: item.isOwn ? 'white' : textColor }}>
            {item.text}
          </Text>
        )}
      </View>
      
      {/* Message Info */}
      <View className={`flex-row items-center mt-1 ${
        item.isOwn ? 'flex-row-reverse' : 'flex-row'
      }`}>
        <Text className="text-xs mx-2" style={{ color: textColor, opacity: 0.6 }}>
          {item.timestamp}
        </Text>
        {item.isOwn && (
          <Ionicons 
            name={getStatusIcon(item.status)} 
            size={14} 
            color={getStatusColor(item.status)} 
          />
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Chat Header */}
      <View className="border-b px-4 py-3"
            style={{
              backgroundColor: cardBg,
              borderBottomColor: borderColor,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
        <View className="flex-row items-center">
          {/* Avatar */}
          <View 
            className="w-10 h-10 rounded-full items-center justify-center mr-3"
            style={{ backgroundColor: '#3B82F6' }}
          >
            <Text className="text-white text-sm font-bold">
              {chatData?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
            </Text>
          </View>
          
          {/* User Info */}
          <View className="flex-1">
            <Text className="text-lg font-bold" style={{ color: textColor }}>
              {chatData?.name || 'Kullanıcı'}
            </Text>
            <View className="flex-row items-center">
              <View className={`w-2 h-2 rounded-full mr-2 ${
                chatData?.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>
                {chatData?.isOnline ? 'Çevrimiçi' : 'Son görülme: 2 saat önce'}
              </Text>
            </View>
          </View>
          
          {/* Action Buttons */}
          <View className="flex-row">
            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center mr-2"
              onPress={() => Alert.alert('Arama', 'Arama özelliği yakında eklenecek.')}
            >
              <Ionicons name="call" size={20} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity 
              className="w-10 h-10 items-center justify-center"
              onPress={() => Alert.alert('Video Arama', 'Video arama özelliği yakında eklenecek.')}
            >
              <Ionicons name="videocam" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Messages List */}
      <View className="flex-1" style={{ backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB' }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
      </View>

      {/* Message Input */}
      <View className="border-t px-4 py-3"
            style={{
              backgroundColor: cardBg,
              borderTopColor: borderColor,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}>
        <View className="flex-row items-end">
          {/* Attachment Button */}
          <TouchableOpacity 
            className="w-10 h-10 items-center justify-center mr-2"
            onPress={() => Alert.alert('Dosya Ekleme', 'Dosya ekleme özelliği yakında eklenecek.')}
          >
            <Ionicons name="attach" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          {/* Text Input */}
          <View className="flex-1 rounded-2xl px-4 py-2 mr-2" style={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }}>
            <TextInput
              className="text-base max-h-24"
              style={{ color: textColor }}
              placeholder="Mesajınızı yazın..."
              placeholderTextColor="#9CA3AF"
              value={messageText}
              onChangeText={setMessageText}
              multiline
              textAlignVertical="top"
            />
          </View>
          
          {/* Send Button */}
          <TouchableOpacity 
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: messageText.trim().length > 0 
                ? primaryColor 
                : (isDarkMode ? '#6B7280' : '#D1D5DB'),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: messageText.trim().length > 0 ? 0.2 : 0.1,
              shadowRadius: 4,
              elevation: messageText.trim().length > 0 ? 4 : 2,
            }}
            onPress={sendMessage}
            disabled={messageText.trim().length === 0}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={messageText.trim().length > 0 ? "white" : (isDarkMode ? '#9CA3AF' : '#6B7280')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatMessages;