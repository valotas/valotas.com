export function btoa(input = "") {
  return Buffer.from(input).toString("base64");
}
