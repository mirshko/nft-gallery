export const ADDRESS = new RegExp(`(?:^0x[a-fA-F0-9]{40}$)`);

export function shortenHex(hex, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}
