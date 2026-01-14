/**
 * Get the flag data URL for a given country code and size
 */
export declare function getFlagUrl(code: string, size?: 's' | 'm' | 'l'): string;
/**
 * Helper to get a specific flag
 * Usage: const nlFlag = importFlag('NL', 'l')
 */
export declare function importFlag(code: string, size?: 's' | 'm' | 'l'): string;
