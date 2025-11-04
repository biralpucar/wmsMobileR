import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: true, title: 'Ana Sayfa' }} />
                  <Stack.Screen name="goods-receipt/customer-select" options={{ headerShown: true, title: 'Cari Seçimi' }} />
            <Stack.Screen name="goods-receipt/order-list" options={{ headerShown: true, title: 'Açık Siparişler' }} />
            <Stack.Screen name="goods-receipt/order-detail" options={{ headerShown: true, title: 'Sipariş Detayı' }} />
            <Stack.Screen name="goods-receipt/create-goods-receipt" options={{ headerShown: true, title: 'Mal Kabul Oluştur' }} />
    </Stack>
  );
}
