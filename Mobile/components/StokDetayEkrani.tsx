import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

interface StokDetayEkraniProps {
  visible: boolean;
  selectedProduct: any;
  onClose: () => void;
}

export default function StokDetayEkrani({
  visible,
  selectedProduct,
  onClose
}: StokDetayEkraniProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');
  const secondaryColor = useThemeColor({}, 'secondary');
  const surfaceColor = useThemeColor({}, 'surface');
  const redColor = useThemeColor({}, 'red');
  const orangeColor = useThemeColor({}, 'orange');
  const yellowColor = useThemeColor({}, 'yellow');
  const greenColor = useThemeColor({}, 'green');
  const blueColor = useThemeColor({}, 'blue');
  const indigoColor = useThemeColor({}, 'indigo');
  const purpleColor = useThemeColor({}, 'purple');
  const pinkColor = useThemeColor({}, 'pink');
  const grayColor = useThemeColor({}, 'gray');
  const blueBorderColor = useThemeColor({}, 'blueBorder');
  const greenBorderColor = useThemeColor({}, 'greenBorder');
  const yellowBorderColor = useThemeColor({}, 'yellowBorder');
  const purpleBorderColor = useThemeColor({}, 'purpleBorder');
  const indigoBorderColor = useThemeColor({}, 'indigoBorder');

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }}>
        <View style={{
          backgroundColor: surfaceColor,
          borderRadius: 12,
          padding: 24,
          width: '95%',
          maxWidth: 400,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderWidth: 1,
          borderColor: yellowBorderColor
        }}>
          {/* Header */}
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: blueColor,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <Ionicons name="cube" size={20} color={textColor} />
              </View>
              <Text style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: textColor
              }}>Stok Detayları</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={textColor} />
            </TouchableOpacity>
          </View>

          {/* Product Details */}
          {selectedProduct && (
            <View style={{ gap: 12 }}>
              <View style={{
                backgroundColor: grayColor,
                borderRadius: 8,
                padding: 16,
                borderWidth: 1,
                borderColor: blueBorderColor
              }}>
                <Text style={{
                  color: textColor,
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 8
                }}>{selectedProduct.name}</Text>

                <View style={{ gap: 8 }}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 4
                  }}>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600',
                      opacity: 0.8
                    }}>Stok Kodu:</Text>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600'
                    }}>{selectedProduct.stokKodu}</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 4
                  }}>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600',
                      opacity: 0.8
                    }}>Miktar:</Text>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600'
                    }}>{selectedProduct.miktar}</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 4
                  }}>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600',
                      opacity: 0.8
                    }}>Seri Takibi:</Text>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600'
                    }}>{selectedProduct.seriTakibi}</Text>
                  </View>

                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingVertical: 4
                  }}>
                    <Text style={{
                      color: textColor,
                      fontWeight: '600',
                      opacity: 0.8
                    }}>Mevcut Stok:</Text>
                    <View style={{
                      backgroundColor: greenColor,
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 4
                    }}>
                      <Text style={{
                        color: textColor,
                        fontSize: 14,
                        fontWeight: 'bold'
                      }}>{selectedProduct.stock || '0'} Adet</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Additional Stock Info */}
              <View style={{
                backgroundColor: blueColor,
                borderRadius: 8,
                padding: 16,
                borderWidth: 1,
                borderColor: blueBorderColor
              }}>
                <Text style={{
                  color: textColor,
                  fontWeight: 'bold',
                  marginBottom: 8
                }}>Stok Durumu</Text>
                <View style={{ gap: 4 }}>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    opacity: 0.9
                  }}>• Depo Lokasyonu: A-12-03</Text>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    opacity: 0.9
                  }}>• Son Giriş: 15.12.2024</Text>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    opacity: 0.9
                  }}>• Minimum Stok: 5 Adet</Text>
                  <Text style={{
                    color: textColor,
                    fontSize: 14,
                    opacity: 0.9
                  }}>• Durum: {(selectedProduct.stock || 0) > 5 ? 'Yeterli' : 'Kritik'}</Text>
                </View>
              </View>
            </View>
          )}

          {/* Close Button */}
          <TouchableOpacity
            style={{
              backgroundColor: blueColor,
              borderRadius: 8,
              paddingVertical: 12,
              marginTop: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3
            }}
            onPress={onClose}
          >
            <Text style={{
              color: textColor,
              textAlign: 'center',
              fontWeight: '600'
            }}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}