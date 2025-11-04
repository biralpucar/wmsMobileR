import { BaseEntity } from './BaseEntity';
import { GrHeader } from './GrHeader';

export interface GrLine extends BaseEntity {
  // Header tablosuna foreign key
  headerId: number;
  header?: GrHeader;
  
  // İlgili sipariş kaydının Id'si
  orderId?: number;
  
  // Satırdaki miktar bilgisi
  quantity: number;
  
  // ERP tarafındaki ürün kodu
  erpProductCode: string;
  
  // Ölçü birimi
  measurementUnit?: number;
  
  // Seri numarası takibi
  isSerial: boolean;
  autoSerial: boolean;
  quantityBySerial: boolean;
  
  // Hedef depo kodu
  targetWarehouse?: number;
  
  // Açıklama alanları
  description1?: string;
  description2?: string;
  description3?: string;
}