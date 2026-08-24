export function formatNaira(amount: number) {
  if (amount >= 1000000) {
    return `\u20A6${(amount / 1000000).toFixed(0)}M`;
  }
  return `\u20A6${amount.toLocaleString("en-NG")}`;
}

export function formatArea(sqm: number) {
  return `${sqm.toLocaleString("en-NG")} m\u00B2`;
}

export function formatFullPrice(amount: number) {
  return `\u20A6${amount.toLocaleString("en-NG")}`;
}
