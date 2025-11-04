import CustomHeader from '@/components/CustomHeader';
import CustomInfoCard from '@/components/CustomInfoCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import ChatList from './ChatList';
import ChatMessages from './ChatMessages';

export default function Chat() {
  const navigation = useNavigation();
  const [selectedChat, setSelectedChat] = useState(null);
  const { isDarkMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'background');

  const handleChatSelect = (chat: any) => {
    setSelectedChat(chat);
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };
  const handleHeaderBackPress = () => {
    // Eğer chat mesajları gösteriliyorsa, chat listesine dön
    if (selectedChat) {
      setSelectedChat(null);
    } else {
      // Chat listesinde ise home'a dön
      navigation.goBack();
    }
  };


  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <CustomHeader
        title="Chat"
        iconName="business-outline"
        showBackButton={true}
        onBackPress={handleHeaderBackPress}
      />

      <CustomInfoCard
        title="Chat Sistemi"
        message="Depo personeli ile anlık iletişim kurun"
        buttonPosition={{ right: 10, top: 100 }}
        cardPosition={{ top: 135, right: 16, left: 16 }}
      />

      <View className="flex-1">
        {selectedChat ? (
          <ChatMessages
            chatData={selectedChat}
            onBack={handleBackToList}
          />
        ) : (
          <ChatList onChatSelect={handleChatSelect} />
        )}
      </View>
    </SafeAreaView>
  );
}