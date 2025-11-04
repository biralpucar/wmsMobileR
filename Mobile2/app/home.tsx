import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService } from '../services/AuthService';
import { MenuService } from '../services/MenuService';
import { UserDto } from '../types/Auth';
import { MobilemenuHeaderDto, MobilemenuLineDto } from '../types/Menu';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  welcomeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
    marginTop: 8,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 120,
    justifyContent: 'space-between',
  },
  menuIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    fontSize: 14,
    marginTop: 20,
  },
});

export default function DashboardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserDto | null>(null);
  const [menus, setMenus] = useState<MobilemenuHeaderDto[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      // Kullanıcı bilgisini yükle
      const storedUser = await AuthService.getStoredUser();
      if (storedUser) {
        setUser(storedUser);
        
        // Menüleri yükle
        const menusResponse = await MenuService.getActiveMenus();
        if (menusResponse.success && menusResponse.data) {
          setMenus(menusResponse.data);
        }
      } else {
        // Eğer stored user yoksa profile'tan çek
        const profileResponse = await AuthService.getProfile();
        if (profileResponse.success && profileResponse.data) {
          setUser(profileResponse.data);
          const menusResponse = await MenuService.getActiveMenus();
          if (menusResponse.success && menusResponse.data) {
            setMenus(menusResponse.data);
          }
        }
      }
    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Çıkış Yap',
          style: 'destructive',
          onPress: async () => {
            await AuthService.logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const handleMenuPress = (menu: MobilemenuHeaderDto) => {
    console.log('Menu pressed:', menu.menuId);
    // TODO: Navigate to menu detail or action
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={{ marginTop: 12, color: '#6b7280' }}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Dashboard</Text>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Çıkış</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {user?.fullName || 'Kullanıcı'} • {user?.role || 'Depo Operatörü'}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>🎉 Hoş Geldiniz!</Text>
          <Text style={styles.welcomeText}>
            {user?.fullName}, WMS sistemine başarıyla giriş yaptınız.
          </Text>
          <Text style={styles.welcomeText}>
            Aşağıdaki menülerden işlemlerinize başlayabilirsiniz.
          </Text>
        </View>

        {/* Menüler */}
        {menus.length > 0 ? (
          <>
            <Text style={styles.sectionTitle}>📋 Menüler</Text>
            <View style={styles.menuGrid}>
              {menus.map((menu) => (
                <TouchableOpacity
                  key={menu.id}
                  style={styles.menuCard}
                  onPress={() => handleMenuPress(menu)}
                >
                  <Text style={styles.menuIcon}>{menu.icon || '📦'}</Text>
                  <View>
                    <Text style={styles.menuTitle}>{menu.title}</Text>
                    <Text style={styles.menuSubtitle}>
                      {menu.isOpen ? 'Açık' : 'Kapalı'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <Text style={styles.emptyText}>
            Şu anda aktif menü bulunmuyor.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
