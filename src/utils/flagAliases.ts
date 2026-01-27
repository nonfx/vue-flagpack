/**
 * Flag alias mapping system
 *
 * This maps alternative flag names to their canonical flag code.
 * Useful for cases where multiple names refer to the same flag SVG.
 */

export type FlagAliasMap = Record<string, string>;

/**
 * Map of flag aliases to their canonical flag code
 * Key: alias name (will be normalized to uppercase)
 * Value: canonical flag code
 */
export const FLAG_ALIASES: FlagAliasMap = {
  // Globe/World/International aliases - all map to 001
  'EARTH': '001',
  'GLOBE': '001',
  'GLOBAL': '001',
  'WORLD': '001',
  'INTERNATIONAL': '001',

  // Other specific aliases
  'UK': 'GB'
};

/**
 * Resolves a flag code through the alias system
 * @param code The flag code to resolve (can be an alias or canonical code)
 * @returns The canonical flag code, or the original code if no alias exists
 */
export function resolveFlagAlias(code: string | undefined): string | undefined {
  if (!code) return undefined;

  const normalizedCode = code.trim().toUpperCase();

  // Check if this code is an alias
  if (FLAG_ALIASES[normalizedCode]) {
    return FLAG_ALIASES[normalizedCode];
  }

  // Return the original code if no alias found
  return code;
}
