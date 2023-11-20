export function Wzuh() {
  return function<T extends { new (...args: any[]): {} }>(constructor: T) {
    const keysMap = constructor.prototype.keysMap as Map<string, string> || undefined;
    return class extends constructor {
      constructor(...args: any[]) {
        super();
        const params = args.length > 0 ? args[0] : null;
        if (keysMap && params && typeof params === 'object') {
          keysMap.forEach((mapFrom, key) => {
            if (params.hasOwnProperty(mapFrom)) {
              this[key] = params[mapFrom];
            }
          })
        }
      }
    };
  }
}

export function Mapable(mapFrom?: string) {
  return function(target: any, key: string) {
    if (!target.constructor.prototype.keysMap) {
      target.constructor.prototype.keysMap = new Map<string, string>();
    }
    target.constructor.prototype.keysMap.set(key, mapFrom || key);
    // console.log(`${key} type: ${target.constructor.name}`);    
  }
}

export function WzuhParams(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(2);
}