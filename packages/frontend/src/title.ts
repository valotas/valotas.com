export function name() {
  return "Georgios Valotasios";
}

export function createTitle(title?: string | null) {
  return title || name();
}
