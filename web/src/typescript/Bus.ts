export class Bus<T> {
  private listeners: ((T) => void)[] = [];

  notify(val: T) {
    this.listeners.forEach((listener) => listener(val));
  }

  register(listener: (T) => void) {
    this.listeners.push(listener);

    // return an unregister function
    return () => {
      const index = this.listeners.indexOf(listener);
      this.listeners.splice(index, 1);
    };
  }
}
