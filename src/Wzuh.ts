export function Wzuh<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super();

      const params = args.length > 0 ? args[0] : null;
      if (params && typeof params === 'object') {
        console.log(constructor)
        for (const key of Object.getOwnPropertyNames(params)) {
          //console.log(key)
          if (params.hasOwnProperty(key)) {
            this[key] = params[key];
          }
        }
      }
    }
  };
}
