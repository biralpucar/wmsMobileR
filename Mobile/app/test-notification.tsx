import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';

export default function TestNotification() {
  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <CustomHeader 
        title="Bildirim Testi"
        subtitle="Modal notification paneli test sayfası"
        showNotificationButton={true}
        notificationCount={5}
        showChatButton={true}
        chatMessageCount={3}
      />
      
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
            Modal Notification Panel Test
          </Text>
          <Text style={{ fontSize: 14, color: '#666', lineHeight: 20 }}>
            Bu sayfa notification panelinin modal olarak çalışıp çalışmadığını test etmek için oluşturulmuştur.
            {'\n\n'}
            Üstteki bildirim butonuna tıklayarak modal'ın açılıp açılmadığını ve scroll'un çalışıp çalışmadığını kontrol edebilirsiniz.
            {'\n\n'}
            Modal özellikleri:
            {'\n'}• Fade animasyonu ile açılır/kapanır
            {'\n'}• Overlay tıklaması ile kapanır
            {'\n'}• ScrollView içinde smooth scroll
            {'\n'}• Responsive tasarım
            {'\n'}• Modern UI
          </Text>
        </View>
        
        {/* Test için uzun içerik */}
        {Array.from({ length: 10 }, (_, i) => (
          <View key={i} style={{ backgroundColor: 'white', padding: 15, borderRadius: 8, marginBottom: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Test Kartı {i + 1}</Text>
            <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>
              Bu kart arka plan scroll'unun çalışıp çalışmadığını test etmek için eklendi.
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}