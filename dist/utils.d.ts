/**
 * Get the flag SVG URL for a given country code and size
 * This uses dynamic imports to enable tree-shaking
 */
export declare function getFlagUrl(code: string, size?: 's' | 'm' | 'l'): Promise<string>;
/**
 * Helper to import a specific flag statically for maximum tree-shaking
 * Usage: const nlFlag = await importFlag('NL', 'l')
 */
export declare function importFlag(code: string, size?: 's' | 'm' | 'l'): Promise<string>;
