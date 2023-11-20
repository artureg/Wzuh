
const keysMapKey = Symbol('keysMap');
const keysKey = Symbol('keys');

export function Mappable(mapFrom?: string) {
  return function(target: any, key: string) {

    const keysMap = Reflect.getOwnMetadata(keysMapKey, target.constructor) as Map<string, string> || new Map<string, string>();
    keysMap.set(key, mapFrom || key);
    Reflect.defineMetadata(keysMapKey, keysMap, target.constructor);
    // console.log(`${key} type: ${target.constructor.name}`);    
  }
}

export function Mapper() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const childFunction = descriptor.value!;
    descriptor.value = (params) => {
      const result =  new target();

      const keysMap = Reflect.getOwnMetadata(keysMapKey, target) as Map<string, string> || undefined;
      if (keysMap && params && typeof params === 'object') {
        keysMap.forEach((mapFrom, key) => {
          if (params.hasOwnProperty(mapFrom)) {
            result[key] = params[mapFrom];
          }
        })
      }

      return result;
    }
  };
}