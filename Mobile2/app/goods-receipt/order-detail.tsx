import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GoodsReceiptService } from '../../services/GoodsReceiptService';
import { GoodsOpenOrdersLineDto } from '../../types/GoodsReceipt';

export default function OrderDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const siparisNo = params.siparisNo as string;
  const customerCode = params.customerCode as string;
  const customerName = params.customerName as string;

  const [loading, setLoading] = useState(true);
  const [orderLines, setOrderLines] = useState<GoodsOpenOrdersLineDto[]>([]);

  useEffect(() => {
    if (siparisNo) {
      loadOrderDetails();
    }
  }, [siparisNo]);

  const loadOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await GoodsReceiptService.getLinesByOrders(siparisNo);
      if (response.success && response.data) {
        setOrderLines(response.data);
      }
    } catch (error) {
      console.error('Load order details error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGoodsReceipt = () => {
    router.push({
      pathname: '/goods-receipt/create-goods-receipt',
      params: {
        siparisNo: siparisNo,
        customerCode: customerCode,
        customerName: customerName
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

  const renderOrderLine = ({ item }: { item: GoodsOpenOrdersLineDto }) => {
    const remainingQty = item.remainingForImport || 0;
    const orderedQty = item.orderedQty || 0;
    const deliveredQty = item.deliveredQty || 0;
    const progress = orderedQty > 0 ? Math.round((deliveredQty / orderedQty) * 100) : 0;

    return (
      <View style={styles.lineCard}>
        <View style={styles.lineHeader}>
          <View style={styles.stockInfo}>
            <Text style={styles.stockCode}>{item.stockCode || '-'}</Text>
            <Text style={styles.stockName} numberOfLines={2}>
              {item.stockName || '-'}
            </Text>
          </View>
          {remainingQty > 0 && (
            <View style={styles.remainingBadge}>
              <Text style={styles.remainingText}>
                Kalan: {remainingQty.toFixed(2)}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.quantitySection}>
          <View style={styles.quantityRow}>
            <View style={styles.quantityItem}>
              <Text style={styles.quantityLabel}>Sipariş</Text>
              <Text style={styles.quantityValue}>{orderedQty.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityItem}>
              <Text style={styles.quantityLabel}>Teslim</Text>
              <Text style={styles.quantityValueDelivered}>{deliveredQty.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityItem}>
              <Text style={styles.quantityLabel}>Kalan</Text>
              <Text style={[styles.quantityValueRemaining, remainingQty === 0 && styles.quantityValueZero]}>
                {remainingQty.toFixed(2)}
              </Text>
            </View>
          </View>

          {orderedQty > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{progress}%</Text>
            </View>
          )}
        </View>

        {item.targetWh && (
          <View style={styles.warehouseInfo}>
            <Text style={styles.warehouseLabel}>Depo:</Text>
            <Text style={styles.warehouseValue}>{item.targetWh}</Text>
          </View>
        )}
      </View>
    );
  };

  const totalRemaining = orderLines.reduce((sum, line) => sum + (line.remainingForImport || 0), 0);
  const hasRemaining = totalRemaining > 0;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Sipariş detayları yükleniyor...</Text>
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
          <Text style={styles.headerTitle}>Sipariş Detayı</Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {siparisNo}
          </Text>
          {customerName && (
            <Text style={styles.headerCustomer} numberOfLines={1}>
              {customerName}
            </Text>
          )}
        </View>
        {orderLines.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{orderLines.length}</Text>
          </View>
        )}
      </View>

      {/* Summary Card */}
      {orderLines.length > 0 && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Toplam Satır</Text>
              <Text style={styles.summaryValue}>{orderLines.length}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Kalan Toplam</Text>
              <Text style={[styles.summaryValue, hasRemaining && styles.summaryValueHighlight]}>
                {totalRemaining.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Order Lines */}
      <FlatList
        data={orderLines}
        renderItem={renderOrderLine}
        keyExtractor={(item, index) => `${item.stockCode}-${index}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>Sipariş detayı bulunamadı</Text>
          </View>
        }
      />

      {/* Action Button */}
      {hasRemaining && (
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleCreateGoodsReceipt}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonIcon}>📦</Text>
            <Text style={styles.actionButtonText}>Mal Kabul Et</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
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
    fontWeight: '600',
    marginBottom: 2,
  },
  headerCustomer: {
    fontSize: 13,
    color: '#94a3b8',
  },
  countBadge: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 32,
    alignItems: 'center',
  },
  countText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#e2e8f0',
    marginHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
  },
  summaryValueHighlight: {
    color: '#2563eb',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  lineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stockInfo: {
    flex: 1,
    marginRight: 12,
  },
  stockCode: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  stockName: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  remainingBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  remainingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16a34a',
  },
  quantitySection: {
    marginBottom: 12,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
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
  quantityValueZero: {
    color: '#94a3b8',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressBarContainer: {
    flex: 1,
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
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
    minWidth: 40,
    textAlign: 'right',
  },
  warehouseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  warehouseLabel: {
    fontSize: 12,
    color: '#64748b',
    marginRight: 6,
    fontWeight: '500',
  },
  warehouseValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1e293b',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  actionButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
