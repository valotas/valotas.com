// @ts-expect-error TS2305
import { CodeSpanRendererProps } from "react-marked-renderer";

export function CodeSpan({ children }: CodeSpanRendererProps) {
  return <code className={`bg-gray-200 rounded px-1`}>{children}</code>;
}
