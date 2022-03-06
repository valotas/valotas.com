export function log(...msgs: string[]) {
  const msg = msgs.join(" ");
  process.stdout.write(`${msg}\n`);
}
