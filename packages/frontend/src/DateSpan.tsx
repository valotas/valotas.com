import React from "react";
import { format as fnsFormat, parseISO } from "date-fns";
import { tw } from "./twind.js";

export type DateSpanProps = {
  iso?: string;
  format?: string;
};

export function DateSpan({ iso, format }: DateSpanProps) {
  const parsedDate = iso ? parseISO(iso) : undefined;
  const formatedDate = parsedDate
    ? fnsFormat(parsedDate, format || "PPP")
    : undefined;

  return (
    <span
      data-testid="date"
      className={tw`block text-gray-500 uppercase font-semibold text-xs tracking-wide mb-1`}
    >
      {formatedDate || " "}
    </span>
  );
}
