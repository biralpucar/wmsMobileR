import CustomDropdown from '@/components/CustomDropdown';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useThemeColor } from '@/hooks/useThemeColor';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomAlert from '../../../components/CustomAlert';

interface RouteParams {
    selectedDepo?: string;
}

interface PlanliTransfer {
    id: string;
    tarih: string;
    durum: 'Bekliyor' | 'Toplanıyor' | 'Tamamlandı';
    cikisDepoKodu: string;
    cikisDepoAdi: string;
    karsiDepoKodu: string;
    karsiDepoAdi: string;
    cariKodu: string;
    cariAdi: string;
    projeKodu: string;
    projeAdi: string;
    belgeSeriNo: string;
    eIrsaliye: boolean;
    aciklama1: string;
    aciklama2: string;
    aciklama3: string;
}

interface PlanliDepoTransferleriListesiProps {
    selectedDepo?: string;
    onDetayPress?: (transfer: PlanliTransfer) => void;
    onBaslatPress?: (transfer: PlanliTransfer) => void;
    onDepoChange?: (depo: string) => void;
}

const PlanliDepoTransferleriListesi: React.FC<PlanliDepoTransferleriListesiProps> = ({
    selectedDepo,
    onDetayPress,
    onBaslatPress,
    onDepoChange
}) => {
    const { t } = useLanguage();
    const { isDarkMode } = useTheme();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const cardColor = useThemeColor({}, 'card');
    const surfaceColor = useThemeColor({}, 'surface');
    const primaryColor = useThemeColor({}, 'primary');
    const secondaryColor = useThemeColor({}, 'secondary');
    const borderColor = useThemeColor({}, 'border');
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

    const [expandedTransfers, setExpandedTransfers] = useState<{ [key: string]: boolean }>({});
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string>(selectedDepo || '');

    // Depo seçenekleri
    const depoOptions = [
        { label: 'Ana Depo', value: 'D001' },
        { label: 'Yedek Depo', value: 'D002' },
        { label: 'Satış Deposu', value: 'D003' },
        { label: 'İade Deposu', value: 'D004' },
    ];

    // Seçili depo bilgisini bul
    const selectedDepoInfo = depoOptions.find(depo => depo.value === selectedDepo);


    // Depo seçimi değiştiğinde parent component'e bildir
    const handleDepoChange = (newDepoValue: string) => {
        setCurrentSelectedDepo(newDepoValue);
        // Parent component'e bildir
        if (onDepoChange) {
            onDepoChange(newDepoValue);
        }
    };


    // Örnek veri
    const [planliTransferler] = useState<PlanliTransfer[]>([
        {
            id: "PLN001",
            tarih: "2024-01-15",
            durum: "Bekliyor",
            cikisDepoKodu: "D001",
            cikisDepoAdi: "Ana Depo",
            karsiDepoKodu: "002",
            karsiDepoAdi: "Şube Depo",
            cariKodu: "C001",
            cariAdi: "ABC Şirketi",
            projeKodu: "PRJ001",
            projeAdi: "Proje A",
            belgeSeriNo: "TR2024001",
            eIrsaliye: true,
            aciklama1: "Acil transfer",
            aciklama2: "Şube ihtiyacı",
            aciklama3: "Onay bekliyor"
        },
        {
            id: "PLN002",
            tarih: "2024-01-16",
            durum: "Toplanıyor",
            cikisDepoKodu: "D002",
            cikisDepoAdi: "Şube Depo",
            karsiDepoKodu: "003",
            karsiDepoAdi: "Bölge Depo",
            cariKodu: "C002",
            cariAdi: "XYZ Ltd.",
            projeKodu: "PRJ002",
            projeAdi: "Proje B",
            belgeSeriNo: "TR2024002",
            eIrsaliye: false,
            aciklama1: "Normal transfer",
            aciklama2: "Stok dengeleme",
            aciklama3: "İşlemde"
        },
        {
            id: "PLN003",
            tarih: "2024-01-17",
            durum: "Bekliyor",
            cikisDepoKodu: "D001",
            cikisDepoAdi: "Ana Depo",
            karsiDepoKodu: "004",
            karsiDepoAdi: "Merkez Depo",
            cariKodu: "C003",
            cariAdi: "DEF A.Ş.",
            projeKodu: "PRJ003",
            projeAdi: "Proje C",
            belgeSeriNo: "TR2024003",
            eIrsaliye: true,
            aciklama1: "Tamamlanan transfer",
            aciklama2: "Başarılı",
            aciklama3: "Arşivlendi"
        }
    ]);

    const toggleTransferExpansion = (transferId: string) => {
        setExpandedTransfers(prev => ({
            ...prev,
            [transferId]: !prev[transferId]
        }));
    };

    const getStatusColor = (durum: string) => {
        switch (durum) {
            case 'Bekliyor':
                return yellowColor;
            case 'Toplanıyor':
                return purpleColor;
            case 'Tamamlandı':
                return greenColor;
            default:
                return blueColor;
        }
    };

    const handleDetayPress = (transfer: PlanliTransfer) => {
        if (onDetayPress) {
            onDetayPress(transfer);
        }
    };

    const handleBaslatPress = (transfer: PlanliTransfer) => {
        if (!selectedDepo) {
            setAlertMessage('Lütfen önce ana sayfadan bir depo seçiniz.');
            setAlertVisible(true);
        } else if (selectedDepo !== `${transfer.cikisDepoKodu}`) {
            setAlertMessage(`Ana sayfadan seçilen depo (${selectedDepo}) ile transfer çıkış deposu (${transfer.cikisDepoKodu} - ${transfer.cikisDepoAdi}) farklıdır. Lütfen uygun depoyu seçiniz.`);
            setAlertVisible(true);
        } else {
            if (onBaslatPress) {
                onBaslatPress(transfer);
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Uyarı Mesajı - Sadece home.tsx'ten depo seçilmemişse ve dropdown'dan da seçilmemişse göster */}
            {!selectedDepo && !currentSelectedDepo && (
                <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: yellowColor, borderColor: yellowBorderColor }}>
                    <View className="flex-row items-center mb-2">
                        <Ionicons name="warning-outline" size={20} color={textColor} />
                        <Text className="font-medium ml-2" style={{ color: textColor }}>{t('depoSecimiGerekli')}</Text>

                    </View>
                    <Text className="text-sm" style={{ color: textColor }}>
                        {t('anaSayfadanDepoSecimiYapilmamis')}
                    </Text>
                </View>
            )}

            {/* Kaynak Depo Seçimi */}
            <View className="rounded-xl p-4 mb-6 border" style={{ backgroundColor: cardColor, borderColor: greenBorderColor }}>
                <View className="flex-row items-center mb-3">
                    <View className="w-10 h-10 rounded-lg items-center justify-center mr-3" style={{ backgroundColor: blueColor }}>
                        <FontAwesome6 name="warehouse" size={20} color={textColor} />
                    </View>
                    <Text className="text-lg font-semibold" style={{ color: textColor }}>{t('secilenDepo')}</Text>
                </View>
                <CustomDropdown
                    label={t('depoSecimi')}
                    icon="business-outline"
                    iconColor={blueBorderColor}
                    placeholder={t('kaynakDepoSeciniz')}
                    options={depoOptions}
                    value={currentSelectedDepo}
                    onSelect={(option) => handleDepoChange(option.value)}
                />
            </View>

            {/* Transfer Listesi */}
            <View style={{ padding: 16, borderWidth: 2, borderColor: blueBorderColor, borderRadius: 12, backgroundColor: cardColor }}>
                {/* Başlık */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
                    <Ionicons name="swap-horizontal-outline" size={24} color={textColor} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: textColor, marginLeft: 8 }}>{t('planliDepoTransferleri')}</Text>
                </View>

                <View>
                    {planliTransferler.map((transfer) => (
                        <View key={transfer.id} style={{ backgroundColor: cardColor, marginBottom: 16, borderRadius: 12, borderWidth: 1, borderColor: greenBorderColor, overflow: 'hidden' }}>
                            {/* Transfer Header */}
                            <TouchableOpacity
                                style={{ backgroundColor: backgroundColor, paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: borderColor }}
                                onPress={() => toggleTransferExpansion(transfer.id)}
                                activeOpacity={0.7}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{width: 32, height: 32, backgroundColor: grayColor, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12}}>
                                            <Ionicons name="swap-horizontal-outline" size={16} color={textColor} />
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 16, fontWeight: '600', color: textColor }}>Transfer #{transfer.id}</Text>
                                            <Text style={{ fontSize: 14, color: textColor }}>{transfer.tarih}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginRight: 12, backgroundColor: getStatusColor(transfer.durum) }}>
                                            <Text style={{ fontSize: 12, fontWeight: '500', color: textColor }}>{transfer.durum}</Text>
                                        </View>
                                        <Ionicons
                                            name={expandedTransfers[transfer.id] ? "chevron-up" : "chevron-down"}
                                            size={20}
                                            color={"white"}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* Transfer Detayları */}
                            {expandedTransfers[transfer.id] && (
                                <View style={{ padding: 16 }}>
                                    {/* Depo Bilgileri */}
                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('depoBilgileri')}</Text>
                                        <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: blueBorderColor }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cikisDepo')}:</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{transfer.cikisDepoKodu} - {transfer.cikisDepoAdi}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('karsiDepo')}:</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{transfer.karsiDepoKodu} - {transfer.karsiDepoAdi}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Cari ve Proje Bilgileri */}
                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('cariVeProje')}</Text>
                                        <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: greenBorderColor }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('cari')}:</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{transfer.cariKodu} - {transfer.cariAdi}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                                                <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('proje')}:</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{transfer.projeKodu} - {transfer.projeAdi}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>{t('belgeSeriNo')}:</Text>
                                                <Text style={{ fontSize: 14, fontWeight: '400', color: textColor }}>{transfer.belgeSeriNo}</Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* E-İrsaliye */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('eIrsaliye')}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingHorizontal: 12,
                                            paddingVertical: 4,
                                            borderRadius: 20,
                                            backgroundColor: transfer.eIrsaliye
                                                ? greenColor
                                                : redColor
                                        }}>
                                            <Ionicons
                                                name={transfer.eIrsaliye ? 'checkmark' : 'close'}
                                                size={14}
                                                color={transfer.eIrsaliye ? textColor : textColor}
                                            />
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                marginLeft: 4,
                                                color: textColor
                                            }}>
                                                {transfer.eIrsaliye ? t('aktif') : t('pasif')}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Açıklamalar */}
                                    <View style={{ marginBottom: 12 }}>
                                        <Text style={{ fontSize: 14, fontWeight: '500', color: textColor }}>{t('aciklamalar')}</Text>
                                        <View style={{ backgroundColor: borderColor, borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: purpleBorderColor }}>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>1. {transfer.aciklama1}</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: textColor, marginBottom: 4 }}>2. {transfer.aciklama2}</Text>
                                            <Text style={{ fontSize: 14, fontWeight: '600', color: textColor }}>3. {transfer.aciklama3}</Text>
                                        </View>
                                    </View>

                                    {/* Aksiyon Butonları */}
                                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 16 }}>
                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                                paddingVertical: 12,
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                backgroundColor: blueColor,
                                                gap: 8
                                            }}
                                            onPress={() => handleDetayPress(transfer)}
                                        >
                                            <Ionicons name="eye" size={16} color={textColor} />
                                            <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{t('detay')}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={{
                                                flex: 1,
                                                paddingVertical: 12,
                                                borderRadius: 8,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                backgroundColor: greenColor,
                                                gap: 8
                                            }}
                                            onPress={() => handleBaslatPress(transfer)}
                                        >
                                            <Text style={{ color: textColor, fontWeight: '700', fontSize: 14 }}>{t('baslat')}</Text>
                                            <Ionicons name="play" size={16} color={textColor} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </View>
                    ))}
                </View>
            </View>

            {/* Custom Alert */}
            <CustomAlert
                visible={alertVisible}
                title={t('bilgi')}
                message={alertMessage}
                type="info"
                buttons={[
                    {
                        text: t('tamam'),
                        onPress: () => setAlertVisible(false),
                        style: 'default'
                    }
                ]}
                onClose={() => setAlertVisible(false)}
            />
        </View>
    );
};

export default PlanliDepoTransferleriListesi;