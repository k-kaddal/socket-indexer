export function amountToReadable(amount: string, decimals: number): number {
  return parseInt(amount) / Math.pow(10, decimals);
}
