// RII_MOBILMENU_HEADER TypeScript Class Definition
// C# Entity'sinin TypeScript karşılığı

export interface RII_MOBILMENU_LINE {
  Id: number;
  ItemId: string;
  Title: string;
  Icon: string;
  Description: string;
  HeaderId: number;
}

export interface RII_MOBILMENU_HEADER {
  Id: number;                 // [Key] [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  MenuId: string;             // [Required] [MaxLength(100)] - JSON'daki "id"
  Title: string;              // [Required] [MaxLength(200)]
  Icon: string;               // [MaxLength(100)]
  IsOpen: boolean;            // default: false
  Lines: RII_MOBILMENU_LINE[]; // Navigation Property (1 Header -> N Lines)
}

// API Response Types - API direkt array döndürüyor
export type RII_MOBILMENU_HEADER_Response = RII_MOBILMENU_HEADER[];

export interface RII_MOBILMENU_HEADER_SingleResponse {
  success: boolean;
  data: RII_MOBILMENU_HEADER;
  message?: string;
}

// Request Types
export interface RII_MOBILMENU_HEADER_CreateRequest {
  MenuId: string;
  Title: string;
  Icon?: string;
  IsOpen?: boolean;
}

export interface RII_MOBILMENU_HEADER_UpdateRequest {
  Id: number;
  MenuId?: string;
  Title?: string;
  Icon?: string;
  IsOpen?: boolean;
}

// Filter/Search Types
export interface RII_MOBILMENU_HEADER_Filter {
  MenuId?: string;
  Title?: string;
  IsOpen?: boolean;
  searchTerm?: string;
}