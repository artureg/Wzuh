import * as ts from 'typescript';
import { KeysMap, KeysMapValue, MapFunction, MapValue, MapperMap, PropertyNameWithType } from './types';

export function Mapper({
  map = {},
  exclude = [],
}: {
  map?: MapperMap,
  exclude?: string[]
} = {
  map: {},
  exclude: [],
}) {
  const classFile = _getCallerFile();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const propertiesInfo = getPropertiesInfo(target.name, classFile).filter((property) => !exclude.includes(property.name));
    const keysMap = prepareKeysMap(map, propertiesInfo);

    descriptor.value = (params) => {
      const result =  new target();
      if (keysMap && params && typeof params === 'object') {
        keysMap.forEach((mapFrom, key) => {
          result[key] = getValue(params, mapFrom);
        })
      }
      return result;
    }
  };
}

const getValue = (params: object, key: KeysMapValue) => {
  if (typeof key.value === 'object') {
    const value = getValue(params, key.value);
    if (!key.nullable && value === null) {
      throw new Error(`Value for key ${key.value} is null`);
    }
    if (!key.optional && value === undefined) {
      throw new Error(`Value for key ${key.value} is undefined`);
    }
    return value;
  }

  let value: any;

  if (typeof key.value === 'function') {
    value = key.value(params);
  } else {
    const keys = key.value
      .split('.');

    let currValue: object | string = params;

    keys.forEach((key) => {
      if (currValue.hasOwnProperty(key)) {
        currValue = currValue[key];
      } else {
        currValue = undefined;
      }
    });

    value = currValue;
  }

  if (value === undefined) {
    return;
  }

  if (typeof value !== key.type) {
    if (typeof value === 'string' && key.type === 'number') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        return parsedValue;
      }
    }
    if (typeof value === 'number' && key.type === 'string') {
      return value.toString();
    }
    throw new Error(`Value: ${value} of field: "${key.value}" is not assignable to type "${key.type}"`);
  }
  return value;
}

const prepareKeysMap = (map: {
  [key: string]: MapValue
}, propertiesInfo: PropertyNameWithType[]) => {
  const keysMap: KeysMap = new Map();
  propertiesInfo.forEach((property) => {
    if (!map.hasOwnProperty(property.name)) {
      keysMap.set(property.name, {
        value: property.name,
        type: property.type,
      });
      return;
    }
    const mapValue = map[property.name];
    if (typeof mapValue === 'object') {
      keysMap.set(property.name, {
        ...mapValue,
        type: property.type,
      });
    } 
    if (typeof mapValue === 'string') {
      keysMap.set(property.name, {
        value: mapValue,
        type: property.type,
      });
    }
    
  });
  return keysMap;
}

function _getCallerFile() {
  const originalFunc = Error.prepareStackTrace;

  let callerfile;
  try {
      const err = new Error();
      let currentfile;

      Error.prepareStackTrace = function (err, stack) { return stack; };

      currentfile = (err.stack as any).shift().getFileName();

      while (err.stack.length) {
          callerfile = (err.stack as any).shift().getFileName();

          if(currentfile !== callerfile) break;
      }
  } catch (e) {}

  Error.prepareStackTrace = originalFunc; 

  return callerfile;
}

function getPropertiesInfo(className: string, filePath: string): PropertyNameWithType[] {
  const program = ts.createProgram([filePath], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  let propertiesInfo: {
    name: string,
    type: string,
  }[] = [];

  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node)) {
      if (node.name && node.name.text === className) {
        ts.forEachChild(node, (childNode) => {
          if (ts.isPropertyDeclaration(childNode) && childNode.name && ts.isIdentifier(childNode.name)) {
            propertiesInfo.push({
              name: childNode.name.text,
              type: convertTypeToPrimitive(checker.typeToString(checker.getTypeAtLocation(childNode))),
            });
          }
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  function convertTypeToPrimitive(type: string) {
    if ([
      'string',
      'number',
      'bigint',
      'boolean',
      'symbol',
      'undefined',
    ].includes(type)) {
      return type;
    }

    return 'object'
  }

  if (sourceFile) {
    visit(sourceFile);
  } else {
    console.error(`Error reading source file: ${filePath}`);
  }

  return propertiesInfo;
}