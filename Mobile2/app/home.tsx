import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthService } from '../services/AuthService';
import { MenuService } from '../services/MenuService';
import { UserDto } from '../types/Auth';
import { MobilemenuHeaderDto } from '../types/Menu';

export default function DashboardScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const [menus, setMenus] = useState<MobilemenuHeaderDto[]>([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      let currentUser = await AuthService.getStoredUser();
      
      if (!currentUser) {
        const profileResponse = await AuthService.getProfile();
        if (profileResponse.success && profileResponse.data) {
          currentUser = profileResponse.data;
        }
      }
      
      if (currentUser) {
        setUser(currentUser);
      }
      
      try {
        const menusResponse = await MenuService.getActiveMenus();
        if (menusResponse.success && menusResponse.data) {
          setMenus(menusResponse.data);
        }
      } catch (menuError) {
        console.error('Menu load error:', menuError);
      }
    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboard();
    setRefreshing(false);
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
    
    if (menu.menuId.toLowerCase().includes('mal') || 
        menu.menuId.toLowerCase().includes('kabul') ||
        menu.title.toLowerCase().includes('mal') ||
        menu.title.toLowerCase().includes('kabul')) {
      router.push('/goods-receipt/customer-select');
      return;
    }
  };
  
  const handleGoodsReceiptPress = () => {
    router.push('/goods-receipt/customer-select');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerGreeting}>Hoş Geldiniz</Text>
            <Text style={styles.headerName}>{user?.fullName || 'Kullanıcı'}</Text>
          </View>
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Text style={styles.logoutIcon}>🚪</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚡ Hızlı İşlemler</Text>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={handleGoodsReceiptPress}
            activeOpacity={0.8}
          >
            <View style={styles.quickActionIconContainer}>
              <Text style={styles.quickActionIcon}>📦</Text>
            </View>
            <View style={styles.quickActionContent}>
              <Text style={styles.quickActionTitle}>Mal Kabul</Text>
              <Text style={styles.quickActionSubtitle}>
                Cari seçerek açık siparişleri görüntüle ve işle
              </Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Menüler */}
        {menus.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📋 Menüler</Text>
            <View style={styles.menuGrid}>
              {menus.map((menu) => (
                <TouchableOpacity
                  key={menu.id}
                  style={styles.menuCard}
                  onPress={() => handleMenuPress(menu)}
                  activeOpacity={0.8}
                >
                  <View style={styles.menuIconContainer}>
                    <Text style={styles.menuIcon}>{menu.icon || '📋'}</Text>
                  </View>
                  <Text style={styles.menuTitle}>{menu.title}</Text>
                  <View style={[styles.menuStatusBadge, menu.isOpen && styles.menuStatusActive]}>
                    <Text style={[styles.menuStatusText, menu.isOpen && styles.menuStatusTextActive]}>
                      {menu.isOpen ? 'Açık' : 'Kapalı'}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Stats Card */}
        <View style={styles.section}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{menus.length}</Text>
              <Text style={styles.statLabel}>Aktif Menü</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>24/7</Text>
              <Text style={styles.statLabel}>Erişim</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>✓</Text>
              <Text style={styles.statLabel}>Sistem Aktif</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerGreeting: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '500',
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  logoutIcon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  quickActionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickActionIcon: {
    fontSize: 28,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  arrow: {
    fontSize: 24,
    color: '#cbd5e1',
    marginLeft: 12,
    fontWeight: '300',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    margin: '1%',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuIcon: {
    fontSize: 24,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  menuStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  menuStatusActive: {
    backgroundColor: '#dcfce7',
  },
  menuStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
  },
  menuStatusTextActive: {
    color: '#16a34a',
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 14,
  },
});
