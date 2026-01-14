import countryCodeList from '../countryCodeList.json';

export interface CountryCode {
  countryName: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
}

/**
 * Convert any ISO code format (alpha2, alpha3, or numeric) to alpha2 (2-letter) code
 * @param isoCode - ISO code in any format (e.g., "US", "USA", "840", "GB", "GBR", "826")
 * @returns The alpha2 (2-letter) code (e.g., "US", "GB") or undefined if not found
 * 
 * @example
 * isoToAlpha2("USA") // "US"
 * isoToAlpha2("840") // "US"
 * isoToAlpha2("US")  // "US"
 */
export function isoToAlpha2(isoCode: string | undefined): string | undefined {
  if (!isoCode) {
    return undefined;
  }

  // Normalize input
  const normalizedCode = isoCode.trim().toUpperCase();

  // Find matching country
  const country = (countryCodeList as CountryCode[]).find(
    (countryObj) =>
      countryObj.alpha2 === normalizedCode ||
      countryObj.alpha3 === normalizedCode ||
      countryObj.numeric === normalizedCode
  );

  return country?.alpha2;
}

/**
 * Check if a given ISO code is valid
 * @param isoCode - ISO code to validate
 * @returns true if the code is valid in any format
 */
export function isValidIsoCode(isoCode: string | undefined): boolean {
  return isoToAlpha2(isoCode) !== undefined;
}
