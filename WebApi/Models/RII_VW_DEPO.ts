export interface RII_VW_DEPO {
  depoKodu: number;
  depoIsmi?: string;
  depoKilitle?: string;
  cariKodu?: string;
  eksibakiye?: string;
  fiatTipi?: string;
  subeKodu: number;
  sYedek1?: string;
  sYedek2?: string;
  iYedek1?: number;
  iYedek2?: number;
  cYedek1?: string;
  cYedek2?: string;
  dYedek1?: Date;
  kayityapankul?: string;
  kayittarihi?: Date;
  duzeltmeyapankul?: string;
  duzeltmetarihi?: Date;
  emanetdepo?: string;
  kilitPolitikasi: number;
}