import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface ChatItem {
  id: string;
  name: string;
  department: string;
  role: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface ChatListProps {
  onChatSelect: (chat: ChatItem) => void;
}

const ChatList: React.FC<ChatListProps> = ({ onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardBg = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');

  // Örnek chat verileri
  const chatData: ChatItem[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      lastMessage: 'Depo transfer işlemi tamamlandı, kontrol edebilirsiniz.',
      lastMessageTime: '14:30',
      unreadCount: 2,
      isOnline: true,
      department: 'Lojistik',
      role: 'Depo Sorumlusu'
    },
    {
      id: '2',
      name: 'Fatma Kaya',
      lastMessage: 'Stok sayım raporu hazır, inceleyebilirsiniz.',
      lastMessageTime: '13:45',
      unreadCount: 0,
      isOnline: true,
      department: 'Muhasebe',
      role: 'Mali Müşavir'
    },
    {
      id: '3',
      name: 'Mehmet Demir',
      lastMessage: 'Sevkiyat emri onayınızı bekliyor.',
      lastMessageTime: '12:20',
      unreadCount: 1,
      isOnline: false,
      department: 'Sevkiyat',
      role: 'Sevkiyat Uzmanı'
    },
    {
      id: '4',
      name: 'Ayşe Özkan',
      lastMessage: 'Yeni ürün kodları sisteme eklendi.',
      lastMessageTime: '11:15',
      unreadCount: 0,
      isOnline: true,
      department: 'IT',
      role: 'Sistem Yöneticisi'
    },
    {
      id: '5',
      name: 'Ali Şahin',
      lastMessage: 'Müşteri siparişi acil olarak hazırlanmalı.',
      lastMessageTime: '10:30',
      unreadCount: 3,
      isOnline: false,
      department: 'Satış',
      role: 'Satış Temsilcisi'
    },
    {
      id: '6',
      name: 'Zeynep Arslan',
      lastMessage: 'Kalite kontrol raporu ekte.',
      lastMessageTime: 'Dün',
      unreadCount: 0,
      isOnline: true,
      department: 'Kalite',
      role: 'Kalite Kontrol Uzmanı'
    }
  ];

  const filteredChats = chatData.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvatarColor = (name: string) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      onPress={() => onChatSelect(item)}
      className="mx-3 my-1 p-4 rounded-xl border"
      style={{ backgroundColor: cardBg, borderColor }}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center">
        {/* Avatar */}
        <View className="relative mr-4">
          <View
            className="w-14 h-14 rounded-full items-center justify-center"
            style={{ backgroundColor: getAvatarColor(item.name) }}
          >
            <Text className="text-white text-lg font-bold">
              {item.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          {/* Online Status */}
          <View
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 ${item.isOnline ? 'bg-green-500' : 'bg-gray-400'
              }`}
            style={{ borderColor: cardBg }}
          />
        </View>

        {/* Chat Info */}
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-lg font-bold flex-1" style={{ color: textColor }} numberOfLines={1}>
              {item.name}
            </Text>
            <Text className="text-sm ml-2" style={{ color: textColor, opacity: 0.6 }}>
              {item.lastMessageTime}
            </Text>
          </View>

          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm text-blue-600 font-medium">
              {item.department} • {item.role}
            </Text>
            {item.unreadCount > 0 && (
              <View className="bg-red-500 rounded-full min-w-6 h-6 items-center justify-center px-2">
                <Text className="text-white text-xs font-bold">
                  {item.unreadCount > 99 ? '99+' : item.unreadCount}
                </Text>
              </View>
            )}
          </View>

          <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }} numberOfLines={2}>
            {item.lastMessage}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      {/* Chat Statistics */}
      <View className="mx-3 mb-4 p-4 rounded-xl border border-green-500"
        style={{ backgroundColor: cardBg }}>
        <View className="flex-row justify-between">
          <View className="items-center flex-1">
            <View className='flex-row items-center'>
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="chatbubbles" size={24} color="#3B82F6" />
              </View>
              <Text className="text-2xl font-bold ml-2" style={{ color: textColor }}>{chatData.length}</Text>
            </View>
            <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>Toplam Chat</Text>
          </View>

          <View className="items-center flex-1">
            <View className='flex-row items-center'>
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mb-2">
                <Ionicons name="people" size={24} color="#10B981" />
              </View>
              <Text className="text-2xl font-bold ml-2" style={{ color: textColor }}>
                {chatData.filter(chat => chat.isOnline).length}
              </Text>
            </View>
            <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>Çevrimiçi</Text>
          </View>

          <View className="items-center flex-1">
            <View className='flex-row items-center'>
              <View className="w-12 h-12 bg-red-100 rounded-full items-center justify-center mb-2">
              <Ionicons name="notifications" size={24} color="#EF4444" />
            </View>
            <Text className="text-2xl font-bold ml-2" style={{ color: textColor }}>
              {chatData.reduce((sum, chat) => sum + chat.unreadCount, 0)}
            </Text>
            </View>
            
            <Text className="text-sm" style={{ color: textColor, opacity: 0.7 }}>Okunmamış</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View className="mx-3 mb-4 rounded-xl border border-blue-300"
        style={{ backgroundColor: cardBg }}>
        <View className="flex-row items-center rounded-xl px-4 py-3" style={{ backgroundColor: isDarkMode ? '#374151' : '#F9FAFB' }}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-3"
            style={{ color: textColor }}
            placeholder="Kişi veya departman ara..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Chat List */}
      <View className="flex-1">
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={
            <View className="mx-3 p-8 rounded-xl border items-center" style={{ backgroundColor: cardBg, borderColor }}>
              <View className="w-20 h-20 rounded-full items-center justify-center mb-4" style={{ backgroundColor: isDarkMode ? '#374151' : '#F3F4F6' }}>
                <Ionicons name="search" size={40} color="#D1D5DB" />
              </View>
              <Text className="text-lg font-medium mb-2" style={{ color: textColor, opacity: 0.7 }}>
                Sonuç bulunamadı
              </Text>
              <Text className="text-sm text-center" style={{ color: textColor, opacity: 0.5 }}>
                Aradığınız kriterlere uygun chat bulunamadı.
              </Text>
            </View>
          }
        />
      </View>

      {/* New Chat Button */}
      <View className="absolute bottom-6 right-6">
        <TouchableOpacity
          className="w-14 h-14 bg-blue-500 rounded-full items-center justify-center"
          activeOpacity={0.8}
          style={{
            shadowColor: '#3B82F6',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatList;