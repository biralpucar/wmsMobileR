// RII_MOBILMENU_LINE Class Definitions
// Menü satırları için interface ve tip tanımlamaları


// RII_MOBILMENU_LINE TypeScript Class Definition
// C# Entity'sinin TypeScript karşılığı

export interface RII_MOBILMENU_LINE {
  Id: number;               // [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  ItemId: string;           // [Required] [MaxLength(100)] - JSON'daki "id"
  Title: string;            // [Required] [MaxLength(200)]
  Icon: string;             // [MaxLength(100)]
  Description: string;      // [MaxLength(500)]
  HeaderId: number;         // [ForeignKey] Header ile ilişki
}

// Menü satırı oluşturma isteği
export interface RII_MOBILMENU_LINE_CreateRequest {
  ItemId: string;
  Title: string;
  Icon?: string;
  Description?: string;
  HeaderId: number;
}

// Menü satırı güncelleme isteği
export interface RII_MOBILMENU_LINE_UpdateRequest {
  Id: number;
  ItemId?: string;
  Title?: string;
  Icon?: string;
  Description?: string;
  HeaderId?: number;
}

// API yanıt tipleri
export interface RII_MOBILMENU_LINE_Response {
  success: boolean;
  data: RII_MOBILMENU_LINE[];
  message?: string;
  totalCount?: number;
}

export interface RII_MOBILMENU_LINE_SingleResponse {
  success: boolean;
  data: RII_MOBILMENU_LINE;
  message?: string;
}

// Filtreleme için interface
export interface RII_MOBILMENU_LINE_Filter {
  HeaderId?: number;
  ItemId?: string;
  Title?: string;
  searchTerm?: string;
}

// Sıralama seçenekleri
export enum RII_MOBILMENU_LINE_SortBy {
  Id = 'Id',
  ItemId = 'ItemId',
  Title = 'Title',
  HeaderId = 'HeaderId'
}

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc'
}

// Sayfalama için interface
export interface RII_MOBILMENU_LINE_Pagination {
  page: number;
  limit: number;
  sortBy?: RII_MOBILMENU_LINE_SortBy;
  sortDirection?: SortDirection;
}