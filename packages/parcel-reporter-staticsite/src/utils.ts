import { parseISO, format } from "date-fns";
import { PackagedBundle } from "@parcel/types";

export function log(...msgs: string[]) {
  const msg = msgs.join(" ");
  process.stdout.write(`${msg}\n`);
}

export function createAlias({ key, date }: { key: string; date: string }) {
  const actualDate = parseISO(date);
  const formatted = format(actualDate, "yyyy/MM");

  return `${formatted}/${key}.html`;
}

export function createRedirectionRule(bundle: PackagedBundle) {
  if (bundle.type !== "html") {
    return null;
  }

  const mainEntry = bundle.getMainEntry();

  if (!mainEntry) {
    return null;
  }

  const { key, date } = mainEntry.meta;

  if (typeof key !== "string") {
    return null;
  }

  if (typeof date !== "string") {
    return null;
  }

  return { from: createAlias({ key, date }), to: `${key}/` };
}
