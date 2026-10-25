const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBengaliNumber(value: number | string) {
  return String(value).replace(/\d/g, (digit) => bengaliDigits[Number(digit)]);
}
