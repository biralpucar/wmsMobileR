import { Ionicons } from "@expo/vector-icons";
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface DropdownItem {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}

export interface DropdownSection {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  items: DropdownItem[];
  isOpen: boolean;
}


export const useDropdownSections = (): DropdownSection[] => {
  const { t } = useTranslation();
  
  return useMemo(() => [
  {
    id: 'mal-kabul',
    title: t('malKabul'),
    icon: 'cube-outline',
    isOpen: false,
    items: [
      {
        id: 'iade-girisi',
        title: t('iadeGirisi'),
        icon: 'return-up-back-outline',
        description: t('iadeGirisiDesc'),
      },
      {
        id: 'irsaliye-fatura',
        title: t('irsaliyeFatura'),
        icon: 'document-text-outline',
        description: t('irsaliyeFaturaDesc'),
      },
    ],
  },
  {
    id: 'sevkiyat',
    title: t('sevkiyat'),
    icon: 'car-outline',
    isOpen: false,
    items: [
      {
        id: 'sevkiyat-emri',
        title: t('sevkiyatEmri'),
        icon: 'send-outline',
        description: t('sevkiyatEmriDesc'),
      },
      {
        id: 'sevkiyat-kontrol',
        title: t('sevkiyatKontrol'),
        icon: 'send-outline',
        description: t('sevkiyatKontrolDesc'),
      },
    ],
  },
  {
    id: 'transfer',
    title: t('transfer'),
    icon: 'swap-horizontal-outline',
    isOpen: false,
    items: [
      {
        id: 'depo-transferi',
        title: t('depoTransferi'),
        icon: 'archive-outline',
        description: t('depoTransferiDesc'),
      },
      {
        id: 'ambar-giris',
        title: t('ambarGiris'),
        icon: 'enter-outline',
        description: t('ambarGirisDesc'),
      },
      {
        id: 'ambar-cikis',
        title: t('ambarCikis'),
        icon: 'exit-outline',
        description: t('ambarCikisDesc'),
      },
      {
        id: 'planli-depo-transferi',
        title: t('planliDepoTransferi'),
        icon: 'calendar-outline',
        description: t('planliDepoTransferiDesc'),
      },
      {
        id: 'planli-ambar-cikis',
        title: t('planliAmbarCikis'),
        icon: 'calendar-clear-outline',
        description: t('planliAmbarCikisDesc'),
      },
    ],
  },
  {
    id: 'sayim',
    title: t('sayim'),
    icon: 'calculator-outline',
    isOpen: false,
    items: [
      {
        id: 'sayim-girisi',
        title: t('sayimGirisi'),
        icon: 'list-outline',
        description: t('sayimGirisiDesc'),
      },
    ],
  },
  {
    id: 'hucre-takibi',
    title: t('hucreTakibi'),
    icon: 'grid-outline',
    isOpen: false,
    items: [
      {
        id: 'hucre-transferi',
        title: t('hucreBilgisi'),
        icon: 'move-outline',
        description: t('hucreBilgisiDesc'),
      },
      {
        id: 'hucreler-arasi-transfer',
        title: t('hucrelerArasiTransfer'),
        icon: 'swap-vertical-outline',
        description: t('hucrelerArasiTransferDesc'),
      },
      {
        id: 'planli-hucre-transferi',
        title: t('planliHucreTransferi'),
        icon: 'calendar-outline',
        description: t('planliHucreTransferiDesc'),
      },
    ],
  },
  {
    id: 'uretim',
    title: t('uretim'),
    icon: 'construct-outline',
    isOpen: false,
    items: [
      {
        id: 'uretim-sonu-kaydi',
        title: t('uretimSonuKaydi'),
        icon: 'checkmark-done-outline',
        description: t('uretimSonuKaydiDesc'),
      },
      {
        id: 'kiosk',
        title: t('kiosk'),
        icon: 'hammer-outline',
        description: t('kioskDesc'),
      },
    ],
  },
  {
    id: 'paketleme',
    title: t('paketleme'),
    icon: 'cube',
    isOpen: false,
    items: [
      {
        id: 'paketleme-girisi',
        title: t('paketlemeGirisi'),
        icon: 'gift-outline',
        description: t('paketlemeGirisiDesc'),
      },
      {
        id: 'paketleme-islemleri',
        title: t('paketlemeIslemleri'),
        icon: 'layers-outline',
        description: t('paketlemeIslemleriDesc'),
      },
    ],
  },
  {
    id: 'sesli-komut',
    title: t('sesliKomut'),
    icon: 'barcode-outline',
    isOpen: false,
    items: [
      {
        id: 'sesli-komut-test',
        title: t('sesliKomutTest'),
        icon: 'repeat-outline',
        description: t('sesliKomutTestDesc'),
      },
    ],
  },
  {
    id: 'genel-bilgi',
    title: t('genelBilgi'),
    icon: 'information-circle-outline',
    isOpen: false,
    items: [
      {
        id: 'stok-detay-ekrani',
        title: t('stokDetayEkrani'),
        icon: 'analytics-outline',
        description: t('stokDetayEkraniDesc'),
      },
    ],
  },
  ], [t]);
};