import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { DepoProvider } from '@/contexts/DepoContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import '../i18n'; // i18n yapılandırmasını yükle

function AppContent() {
  const { effectiveTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (isLoading) return; // Auth durumu henüz belirlenmedi

    const inLoginPage = segments[0] === 'login';

    if (!isAuthenticated && !inLoginPage) {
      // Kullanıcı giriş yapmamış ve login sayfasında değil
      console.log('Redirecting to login - not authenticated');
      router.replace('/login');
    } else if (isAuthenticated && inLoginPage) {
      // Kullanıcı giriş yapmış ama login sayfasında
      console.log('Redirecting to home - authenticated but on login page');
      router.replace('/home');
    }
  }, [isAuthenticated, isLoading, segments]);

  if (!loaded || isLoading) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={effectiveTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName="login">
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="malkabulislemleri/IrsaliyeFaturaGirisi" options={{ headerShown: false }} />
        <Stack.Screen name="malkabulislemleri/IrsaliyeFaturaGirisiForm" options={{ headerShown: false }} />
        <Stack.Screen name="malkabulislemleri/IrsaliyeFaturaGirisiSiparisBaglantiliForm" options={{ headerShown: false }} />
        <Stack.Screen name="malkabulislemleri/IrsaliyeFaturaGirisiSiparisBaglantiliForm2" options={{ headerShown: false }} />
        <Stack.Screen name="malkabulislemleri/IrsaliyeFaturaGirisiSiparisBaglantisizForm" options={{ headerShown: false }} />
        <Stack.Screen name="genelbilgi/StokDetayEkrani" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/depotransferi/DepoTransferi" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/depotransferi/DepoTransferiForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/depotransferi/DepoTransferiForm2" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/planlidepotransferi/PlanliDepoTransferleri" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/planlidepotransferi/PlanliDepoTransferleriBaslat" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambargiris/AmbarGiris" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambargiris/AmbarGirisForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambargiris/AmbarGirisSiparisBaglantiliForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambargiris/AmbarGirisSiparisBaglantiliForm2" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambargiris/AmbarGirisSiparsiBaglantisizForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambarcikis/AmbarCikis" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambarcikis/AmbarCikisForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambarcikis/AmbarCikisSiparisBaglantiliForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambarcikis/AmbarCikisSiparisBaglantiliForm2" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/ambarcikis/AmbarCikisSiparisBaglantisizForm" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/planliambarcikis/PlanliAmbarCikis" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/planliambarcikis/PlanliAmbarCikisBaslat" options={{ headerShown: false }} />
        <Stack.Screen name="transfer/planliambarcikis/PlanliAmbarCikisDetayBilgisi" options={{ headerShown: false }} />
        <Stack.Screen name="sayim/Sayim" options={{ headerShown: false }} />
        <Stack.Screen name="sayim/SayimBarkodOkutma" options={{ headerShown: false }} />
        <Stack.Screen name="hucretakibi/hucretakibi/HucreTakibi" options={{ headerShown: false }} />
        <Stack.Screen name="hucretakibi/hucrelerarasitransfer/HucrelerArasiTransfer" options={{ headerShown: false }} />
        <Stack.Screen name="hucretakibi/planlihucretransferi/PlanliHucreTransferi" options={{ headerShown: false }} />
        <Stack.Screen name="hucretakibi/planlihucretransferi/PlanliHucreTransferiBaslat" options={{ headerShown: false }} />
        <Stack.Screen name="hucretakibi/planlihucretransferi/PlanliHucreTransferiDetayBilgisi" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatemri/SevkiyatEmri" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatemri/SevkiyatEmriBaslat" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatemri/SevkiyatEmriDetayBilgisi" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatemri/SevkiyatEmriListesi" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatkontrol/SevkiyatKontrol" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatkontrol/SevkiyatKontrolBaslat" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatkontrol/SevkiyatKontrolDetayBilgisi" options={{ headerShown: false }} />
        <Stack.Screen name="sevkiyat/sevkiyatkontrol/SevkiyatKontrolSecim" options={{ headerShown: false }} />
        <Stack.Screen name="uretim/uretimsonukaydi/UretimSonuKaydi" options={{ headerShown: false }} />
        <Stack.Screen name="uretim/uretimsonukaydi/UretimSonuKaydiForm" options={{ headerShown: false }} />
        <Stack.Screen name="uretim/uretimsonukaydi/UretimSonuKaydiForm2" options={{ headerShown: false }} />
        <Stack.Screen name="chat/Chat" options={{ headerShown: false }} />
        <Stack.Screen name="chat/ChatList" options={{ headerShown: false }} />
        <Stack.Screen name="chat/ChatMessages" options={{ headerShown: false }} />
        <Stack.Screen name="seslikomut/SesliKomut" options={{ headerShown: false }} />

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <CustomThemeProvider>
        <DepoProvider>
          <AppContent />
        </DepoProvider>
      </CustomThemeProvider>
    </AuthProvider>
  );
}
