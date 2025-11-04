import CustomInfoCard from '@/components/CustomInfoCard';
import { useThemeColor } from '@/hooks/useThemeColor';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import SevkiyatEmriBaslat from './SevkiyatEmriBaslat';
import SevkiyatEmriDetayBilgisi from './SevkiyatEmriDetayBilgisi';
import SevkiyatEmriListesi from './SevkiyatEmriListesi';

type RootStackParamList = {
  'sevkiyat/SevkiyatEmri': { selectedDepo?: string; updatedSelectedDepo?: string };
};

type SevkiyatEmriRouteProp = RouteProp<RootStackParamList, 'sevkiyat/SevkiyatEmri'>;

interface SevkiyatEmri {
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
    stoklar?: any[];
}

const SevkiyatEmriScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<SevkiyatEmriRouteProp>();
    const { selectedDepo, updatedSelectedDepo } = route.params || {};

    // Tema renkleri
    const backgroundColor = useThemeColor({}, 'background');

    const [currentSelectedDepo, setCurrentSelectedDepo] = useState<string | undefined>(selectedDepo);
    const [showDetay, setShowDetay] = useState(false);
    const [showBaslat, setShowBaslat] = useState(false);
    const [selectedSevkiyat, setSelectedSevkiyat] = useState<SevkiyatEmri | null>(null);

    const handleDepoSelectionChange = (newDepoValue: string) => {
        setCurrentSelectedDepo(newDepoValue);
    };

    const handleHeaderBackPress = () => {
        // Eğer başlat ekranı gösteriliyorsa, ana listeye dön
        if (showBaslat) {
            setShowBaslat(false);
            setSelectedSevkiyat(null);
        }
        // Eğer detay ekranı gösteriliyorsa, ana listeye dön
        else if (showDetay) {
            setShowDetay(false);
            setSelectedSevkiyat(null);
        }
        // Ana listede ise home'a dön
        else {
            if (currentSelectedDepo && currentSelectedDepo !== selectedDepo) {
                (navigation as any).navigate('home', { updatedSelectedDepo: currentSelectedDepo });
            } else {
                navigation.goBack();
            }
        }
    };

    const handleDetayPress = (sevkiyat: SevkiyatEmri) => {
        setSelectedSevkiyat(sevkiyat);
        setShowDetay(true);
    };

    const handleBaslatPress = (sevkiyat: SevkiyatEmri) => {
        setSelectedSevkiyat(sevkiyat);
        setShowBaslat(true);
    };

    useFocusEffect(
        useCallback(() => {
            if (updatedSelectedDepo) {
                setCurrentSelectedDepo(updatedSelectedDepo);
                // Parametreyi temizle
                (navigation as any).setParams({ updatedSelectedDepo: undefined });
            }
        }, [updatedSelectedDepo, navigation])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor }}>
            <StatusBar style="dark" />
            
            {/* Header */}
            <CustomHeader
                title="Sevkiyat Emirleri"
                subtitle="Sevkiyat emir işlemleri"
                iconName="swap-horizontal-outline"
                showBackButton={true}
                onBackPress={handleHeaderBackPress}
            />

            {/* Info Card */}
            <CustomInfoCard
                title="Bilgilendirme"
                message="Planlı depo transfer işlemlerini görüntülemek ve başlatmak için aşağıdaki listeden seçim yapınız."
                iconName="information"
                buttonPosition={{ right: 10, top: 100 }}
                cardPosition={{ top: 135, right: 16, left: 16 }}
            />

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 12 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Ana liste ekranı */}
                {!showDetay && !showBaslat ? (
                    <>
                        <SevkiyatEmriListesi
                            selectedDepo={currentSelectedDepo}
                            onDetayPress={handleDetayPress}
                            onBaslatPress={handleBaslatPress}
                            onDepoChange={handleDepoSelectionChange}
                        />
                    </>
                ) : showDetay && selectedSevkiyat ? (
                    <SevkiyatEmriDetayBilgisi
                        sevkiyat={{...selectedSevkiyat, stoklar: []}}
                        onClose={() => {
                            setShowDetay(false);
                            setSelectedSevkiyat(null);
                        }}
                    />
                ) : showBaslat && selectedSevkiyat ? (
                    <SevkiyatEmriBaslat
                        sevkiyat={selectedSevkiyat}
                        selectedDepo={currentSelectedDepo}
                        onClose={() => {
                            setShowBaslat(false);
                            setSelectedSevkiyat(null);
                        }}
                    />
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default SevkiyatEmriScreen;