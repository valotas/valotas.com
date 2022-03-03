export function sortByDate<T extends { date?: string | null }>(arr: T[]): T[] {
  return arr.sort((a, b) => {
    const ad = a.date || "";
    const bd = b.date || "";
    return ad > bd ? -1 : ad < bd ? 1 : 0;
  });
}
