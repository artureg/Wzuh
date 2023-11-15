export function Wzuh(
  mapping?: { [key: string]: string }
) {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    const keysMap = new Map<string, string>();
    if (mapping) {
      for (const key of Object.getOwnPropertyNames(mapping)) {
        keysMap.set(key, mapping[key]);
      }
    }
    return class extends constructor {
      constructor(...args: any[]) {
        super();

        const params = args.length > 0 ? args[0] : null;
        if (params && typeof params === 'object') {
          for (const key of Object.getOwnPropertyNames(params)) {
            const thisKey = keysMap.get(key) || key;
            if (params.hasOwnProperty(thisKey)) {
              this[thisKey] = params[key];
            }
          }
        }
      }
    };
  }
}
