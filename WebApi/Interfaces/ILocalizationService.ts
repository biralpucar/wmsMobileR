export interface ILocalizationService {
  getLocalizedString(key: string): string;
  getLocalizedString(key: string, ...args: any[]): string;
}