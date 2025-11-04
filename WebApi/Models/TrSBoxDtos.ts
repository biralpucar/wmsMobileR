export interface TrSBoxDto {
  id: number;
  importLineId: number;
  boxId: number;
  serialNumber: string;
  description?: string;
  status: string;
  location?: string;
  weight?: number;
  volume?: number;
  dimensions?: string;
  packedDate?: string;
  packedBy?: string;
  unpackedDate?: string;
  unpackedBy?: string;
  qualityStatus?: string;
  qualityNotes?: string;
  damageStatus?: string;
  damageNotes?: string;
  trackingNumber?: string;
  barcodeNumber?: string;
  rfidTag?: string;
  temperature?: number;
  humidity?: number;
  environmentalConditions?: string;
  handlingInstructions?: string;
  specialRequirements?: string;
  notes?: string;
  createdBy?: number;
  createdDate: string;
  updatedBy?: number;
  updatedDate?: string;
  isDeleted: boolean;
  deletedBy?: number;
  deletedDate?: string;
  
  // Full user information properties
  createdByFullUser?: string;
  updatedByFullUser?: string;
  deletedByFullUser?: string;
}

export interface CreateTrSBoxDto {
  importLineId: number;
  boxId: number;
  serialNumber: string;
  description?: string;
  status: string;
  location?: string;
  weight?: number;
  volume?: number;
  dimensions?: string;
  packedDate?: string;
  packedBy?: string;
  unpackedDate?: string;
  unpackedBy?: string;
  qualityStatus?: string;
  qualityNotes?: string;
  damageStatus?: string;
  damageNotes?: string;
  trackingNumber?: string;
  barcodeNumber?: string;
  rfidTag?: string;
  temperature?: number;
  humidity?: number;
  environmentalConditions?: string;
  handlingInstructions?: string;
  specialRequirements?: string;
  notes?: string;
}

export interface UpdateTrSBoxDto {
  importLineId?: number;
  boxId?: number;
  serialNumber?: string;
  description?: string;
  status?: string;
  location?: string;
  weight?: number;
  volume?: number;
  dimensions?: string;
  packedDate?: string;
  packedBy?: string;
  unpackedDate?: string;
  unpackedBy?: string;
  qualityStatus?: string;
  qualityNotes?: string;
  damageStatus?: string;
  damageNotes?: string;
  trackingNumber?: string;
  barcodeNumber?: string;
  rfidTag?: string;
  temperature?: number;
  humidity?: number;
  environmentalConditions?: string;
  handlingInstructions?: string;
  specialRequirements?: string;
  notes?: string;
}