import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GoodsReceiptService } from '../../services/GoodsReceiptService';
import { GoodsOpenOrdersHeaderDto } from '../../types/GoodsReceipt';

export default function OrderListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const customerCode = params.customerCode as string;
  const customerName = params.customerName as string;

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<GoodsOpenOrdersHeaderDto[]>([]);

  useEffect(() => {
    if (customerCode) {
      loadOrders();
    }
  }, [customerCode]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await GoodsReceiptService.getHeadersByCustomer(customerCode);
      if (response.success && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Load orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSelect = (order: GoodsOpenOrdersHeaderDto) => {
    router.push({
      pathname: '/goods-receipt/order-detail',
      params: {
        siparisNo: order.siparisNo,
        customerCode: order.customerCode || customerCode,
        customerName: order.customerName || customerName
      }
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('tr-TR', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  const getProgressPercentage = (ordered?: number, remaining?: number) => {
    if (!ordered || ordered === 0) return 0;
    const delivered = (ordered - (remaining || 0));
    return Math.round((delivered / ordered) * 100);
  };

  const renderOrderItem = ({ item }: { item: GoodsOpenOrdersHeaderDto }) => {
    const progress = getProgressPercentage(item.orderedQty, item.remainingForImport);
    
    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => handleOrderSelect(item)}
        activeOpacity={0.8}
      >
        <View style={styles.orderHeader}>
          <View style={styles.orderNumberContainer}>
            <Text style={styles.orderLabel}>Sipariş No</Text>
            <Text style={styles.orderNumber}>{item.siparisNo}</Text>
          </View>
          {item.mode && (
            <View style={styles.modeBadge}>
              <Text style={styles.modeText}>{item.mode}</Text>
            </View>
          )}
        </View>

        <View style={styles.orderBody}>
          <View style={styles.orderRow}>
            <View style={styles.orderInfoItem}>
              <Text style={styles.infoIcon}>📅</Text>
              <Text style={styles.infoText}>{formatDate(item.orderDate)}</Text>
            </View>
            {item.targetWh && (
              <View style={styles.orderInfoItem}>
                <Text style={styles.infoIcon}>🏭</Text>
                <Text style={styles.infoText}>Depo: {item.targetWh}</Text>
              </View>
            )}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>İlerleme</Text>
              <Text style={styles.progressPercent}>{progress}%</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
          </View>

          <View style={styles.quantityRow}>
            <View style={styles.quantityItem}>
              <Text style={styles.quantityLabel}>Sipariş</Text>
              <Text style={styles.quantityValue}>{item.orderedQty?.toFixed(2) || '0'}</Text>
            </View>
            <View style={styles.quantityItem}>
              <Text style={styles.quantityLabel}>Teslim</Text>
              <Text style={styles.quantityValueDelivered}>{item.deliveredQty?.toFixed(2) || '0'}</Text>
            </View>
            <View style={styles.quantityItem}>
              <Text style={styles.quantityLabel}>Kalan</Text>
              <Text style={styles.quantityValueRemaining}>{item.remainingForImport?.toFixed(2) || '0'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.viewDetailText}>Detayları Görüntüle</Text>
          <Text style={styles.arrow}>›</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Siparişler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.headerSection}>
        <View style={styles.headerIconContainer}>
          <Text style={styles.headerIcon}>📋</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>Açık Siparişler</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {customerName || customerCode}
          </Text>
        </View>
        <View style={styles.orderCountBadge}>
          <Text style={styles.orderCount}>{orders.length}</Text>
        </View>
      </View>

      {/* Order List */}
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.siparisNo}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>
              Bu cari için açık sipariş bulunamadı
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  headerSection: {
    backgroundColor: '#ffffff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  orderCountBadge: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 32,
    alignItems: 'center',
  },
  orderCount: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  listContent: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  orderNumberContainer: {
    flex: 1,
  },
  orderLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 4,
    fontWeight: '500',
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  modeBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  modeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1e40af',
  },
  orderBody: {
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  orderInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  infoIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  progressPercent: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '700',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
  },
  quantityItem: {
    alignItems: 'center',
    flex: 1,
  },
  quantityLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 4,
    fontWeight: '600',
  },
  quantityValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#475569',
  },
  quantityValueDelivered: {
    fontSize: 16,
    fontWeight: '700',
    color: '#16a34a',
  },
  quantityValueRemaining: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  viewDetailText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 20,
    color: '#2563eb',
    fontWeight: '300',
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
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
});
