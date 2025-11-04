import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { GoodsReceiptService } from '../../services/GoodsReceiptService';
import { GrHeaderService } from '../../services/GrHeaderService';
import { GrLineService } from '../../services/GrLineService';
import { GoodsOpenOrdersLineDto } from '../../types/GoodsReceipt';
import { CreateGrHeaderDto } from '../../types/GrHeader';
import { CreateGrLineDto } from '../../types/GrLine';
import { AuthService } from '../../services/AuthService';

interface LineWithQuantity extends GoodsOpenOrdersLineDto {
  selectedQuantity: number;
  isSelected: boolean;
}

export default function CreateGoodsReceiptScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const siparisNo = params.siparisNo as string;
  const customerCode = params.customerCode as string;
  const customerName = params.customerName as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [orderLines, setOrderLines] = useState<LineWithQuantity[]>([]);
  const [documentNo, setDocumentNo] = useState('');
  const [branchCode, setBranchCode] = useState('01'); // Default branch code
  const [yearCode, setYearCode] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    if (siparisNo) {
      loadOrderLines();
    }
  }, [siparisNo]);

  const loadOrderLines = async () => {
    setLoading(true);
    try {
      const response = await GoodsReceiptService.getLinesByOrders(siparisNo);
      if (response.success && response.data) {
        const linesWithQuantity: LineWithQuantity[] = response.data.map(line => ({
          ...line,
          selectedQuantity: line.remainingForImport || 0,
          isSelected: true
        }));
        setOrderLines(linesWithQuantity);
        
        // İlk satırdan branch code ve year code'u al
        if (linesWithQuantity.length > 0) {
          const firstLine = linesWithQuantity[0];
          if (firstLine.branchCode) {
            setBranchCode(firstLine.branchCode.toString().padStart(2, '0'));
          }
          if (firstLine.orderDate) {
            const year = new Date(firstLine.orderDate).getFullYear();
            setYearCode(year.toString());
          }
        }
      }
    } catch (error) {
      console.error('Load order lines error:', error);
      Alert.alert('Hata', 'Sipariş detayları yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const updateLineQuantity = (index: number, quantity: number) => {
    const updatedLines = [...orderLines];
    const line = updatedLines[index];
    const maxQuantity = line.remainingForImport || 0;
    
    if (quantity < 0) {
      quantity = 0;
    } else if (quantity > maxQuantity) {
      quantity = maxQuantity;
      Alert.alert('Uyarı', `Maksimum miktar: ${maxQuantity}`);
    }
    
    line.selectedQuantity = quantity;
    line.isSelected = quantity > 0;
    setOrderLines(updatedLines);
  };

  const toggleLineSelection = (index: number) => {
    const updatedLines = [...orderLines];
    const line = updatedLines[index];
    
    if (line.isSelected) {
      line.isSelected = false;
      line.selectedQuantity = 0;
    } else {
      line.isSelected = true;
      line.selectedQuantity = line.remainingForImport || 0;
    }
    
    setOrderLines(updatedLines);
  };

  const handleCreateGoodsReceipt = async () => {
    // Validations
    if (!documentNo.trim()) {
      Alert.alert('Uyarı', 'Belge numarası zorunludur');
      return;
    }

    const selectedLines = orderLines.filter(line => line.isSelected && line.selectedQuantity > 0);
    if (selectedLines.length === 0) {
      Alert.alert('Uyarı', 'En az bir satır seçmelisiniz');
      return;
    }

    // Validate quantities
    for (const line of selectedLines) {
      if (line.selectedQuantity <= 0) {
        Alert.alert('Uyarı', `${line.stockName || line.stockCode} için geçerli bir miktar girin`);
        return;
      }
      if (line.selectedQuantity > (line.remainingForImport || 0)) {
        Alert.alert('Uyarı', `${line.stockName || line.stockCode} için miktar kalan miktarı aşamaz`);
        return;
      }
    }

    setSaving(true);
    try {
      // Get current user for tracking
      const user = await AuthService.getStoredUser();
      
      // 1. Create GrHeader
      const createHeaderDto: CreateGrHeaderDto = {
        branchCode: branchCode,
        customerCode: customerCode,
        erpDocumentNo: documentNo,
        documentType: 'GR', // Goods Receipt
        documentDate: new Date().toISOString(),
        yearCode: yearCode,
        projectCode: selectedLines[0]?.projectCode,
        returnCode: false,
        ocrSource: false,
        isPlanned: false,
        description1: `Sipariş: ${siparisNo}`,
        description2: customerName
      };

      const headerResponse = await GrHeaderService.create(createHeaderDto);
      if (!headerResponse.success || !headerResponse.data) {
        Alert.alert('Hata', headerResponse.message || 'Başlık oluşturulamadı');
        setSaving(false);
        return;
      }

      const headerId = headerResponse.data.id;

      // 2. Create GrLines
      const createLineDtos: CreateGrLineDto[] = selectedLines.map(line => ({
        headerId: headerId,
        orderId: line.orderID,
        quantity: line.selectedQuantity,
        erpProductCode: line.stockCode || '',
        measurementUnit: 1, // Default measurement unit
        isSerial: false,
        autoSerial: false,
        quantityBySerial: false,
        targetWarehouse: line.targetWh,
        description1: line.stockName || '',
        description2: `Sipariş: ${line.siparisNo}`
      }));

      const linesResponse = await GrLineService.createBatch(createLineDtos);
      if (!linesResponse.success) {
        Alert.alert('Uyarı', linesResponse.message || 'Bazı satırlar oluşturulamadı');
        // Header oluşturuldu ama satırlar hata verdi, header'ı silebiliriz veya uyarı verebiliriz
      }

      Alert.alert(
        'Başarılı',
        'Mal kabul işlemi tamamlandı',
        [
          {
            text: 'Tamam',
            onPress: () => {
              router.back(); // Önceki ekrana dön
              router.back(); // Sipariş detayına dön
            }
          }
        ]
      );
    } catch (error: any) {
      console.error('Create goods receipt error:', error);
      Alert.alert('Hata', error.message || 'Mal kabul işlemi başarısız oldu');
    } finally {
      setSaving(false);
    }
  };

  const selectedCount = orderLines.filter(line => line.isSelected && line.selectedQuantity > 0).length;
  const totalQuantity = orderLines
    .filter(line => line.isSelected)
    .reduce((sum, line) => sum + line.selectedQuantity, 0);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Sipariş detayları yükleniyor...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Info */}
        <View style={styles.headerSection}>
          <Text style={styles.headerTitle}>Mal Kabul Oluştur</Text>
          <Text style={styles.headerSubtitle}>
            Sipariş: {siparisNo} • {customerName}
          </Text>
        </View>

        {/* Document Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Belge Bilgileri</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Belge Numarası *</Text>
            <TextInput
              style={styles.input}
              placeholder="Belge numarası girin"
              placeholderTextColor="#94a3b8"
              value={documentNo}
              onChangeText={setDocumentNo}
              editable={!saving}
            />
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Şube</Text>
              <Text style={styles.infoValue}>{branchCode}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Yıl</Text>
              <Text style={styles.infoValue}>{yearCode}</Text>
            </View>
          </View>
        </View>

        {/* Order Lines */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sipariş Satırları</Text>
            <View style={styles.summaryBadge}>
              <Text style={styles.summaryText}>
                {selectedCount} / {orderLines.length} seçili
              </Text>
            </View>
          </View>

          {orderLines.map((line, index) => (
            <View key={index} style={styles.lineCard}>
              <TouchableOpacity
                style={styles.lineHeader}
                onPress={() => toggleLineSelection(index)}
                activeOpacity={0.7}
              >
                <View style={[styles.checkbox, line.isSelected && styles.checkboxSelected]}>
                  {line.isSelected && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <View style={styles.lineInfo}>
                  <Text style={styles.stockCode}>{line.stockCode || '-'}</Text>
                  <Text style={styles.stockName} numberOfLines={2}>
                    {line.stockName || '-'}
                  </Text>
                </View>
                <View style={styles.quantityInfo}>
                  <Text style={styles.remainingLabel}>Kalan</Text>
                  <Text style={styles.remainingValue}>
                    {line.remainingForImport?.toFixed(2) || '0'}
                  </Text>
                </View>
              </TouchableOpacity>

              {line.isSelected && (
                <View style={styles.quantityInputContainer}>
                  <Text style={styles.quantityLabel}>Kabul Edilecek Miktar</Text>
                  <View style={styles.quantityInputRow}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateLineQuantity(index, line.selectedQuantity - 1)}
                      disabled={saving || line.selectedQuantity <= 0}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                      style={styles.quantityInput}
                      value={line.selectedQuantity.toString()}
                      onChangeText={(text) => {
                        const num = parseFloat(text) || 0;
                        updateLineQuantity(index, num);
                      }}
                      keyboardType="numeric"
                      editable={!saving}
                    />
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => {
                        const max = line.remainingForImport || 0;
                        updateLineQuantity(index, Math.min(line.selectedQuantity + 1, max));
                      }}
                      disabled={saving || line.selectedQuantity >= (line.remainingForImport || 0)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                    <Text style={styles.maxQuantity}>
                      / {line.remainingForImport?.toFixed(2) || '0'}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Summary */}
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Toplam Miktar</Text>
            <Text style={styles.summaryValue}>{totalQuantity.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Seçili Satır</Text>
            <Text style={styles.summaryValue}>{selectedCount}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.createButton, saving && styles.createButtonDisabled]}
          onPress={handleCreateGoodsReceipt}
          disabled={saving || selectedCount === 0 || !documentNo.trim()}
          activeOpacity={0.8}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.createButtonText}>Mal Kabul Oluştur</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollView: {
    flex: 1,
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
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  lineCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  lineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  checkboxSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  lineInfo: {
    flex: 1,
    marginRight: 12,
  },
  stockCode: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  stockName: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
  quantityInfo: {
    alignItems: 'flex-end',
  },
  remainingLabel: {
    fontSize: 11,
    color: '#94a3b8',
    marginBottom: 2,
  },
  remainingValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
  },
  quantityInputContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  quantityLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  quantityInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  quantityInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1.5,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
  },
  maxQuantity: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
  },
  summarySection: {
    backgroundColor: '#ffffff',
    marginTop: 16,
    marginBottom: 100,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  summaryBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  summaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1e40af',
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
  createButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonDisabled: {
    opacity: 0.6,
    shadowOpacity: 0.1,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
