export function illegalArgumentException(message: string) {
  return new NamedException("IllegalArgumentException", message);
}

export function illegalFromatException(message: string) {
  return new NamedException("IllegalFromatException", message);
}

class NamedException implements Error {
  constructor(public name: string, public message: string) {}
}
