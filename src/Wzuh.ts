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
    const propertiesInfo = getPropertiesInfoOfMethodsReturnType(target.name, propertyKey, classFile)
      .filter((property) => !exclude.includes(property.name));
    const keysMap = prepareKeysMap(map, propertiesInfo);

    descriptor.value = (params) => {
      const result =  {};
      if (keysMap && params && typeof params === 'object') {
        keysMap.forEach((mapFrom, key) => {
          const value = getValue(params, mapFrom);
          if (value !== undefined) {
            result[key] = value;
          } else if (mapFrom.propertiesMap) {
            result[key] = {};
            mapFrom.propertiesMap.forEach((mapFrom, propertyKey) => {
              result[key][propertyKey] = getValue(params, mapFrom);
            });
          }
        })
      }
      return result;
    }
  };
}

const getValue = (params: object, key: KeysMapValue) => {
  let value: any;

  if (typeof key.value === 'object') {
    value = {};

    key.value.forEach((mapFrom, key) => {
      value[key] = getValue(params, mapFrom);
    });
  } else if (typeof key.value === 'function') {
    value = key.value(params);
  } else {
    const keys = key.value
      .split('.');

    let currValue: object | string = params;

    keys.forEach((key) => {
      if (currValue === null || currValue === undefined) {
        return;
      }
      if (currValue.hasOwnProperty(key)) {
        currValue = currValue[key];
      } else {
        currValue = undefined;
      }
    });

    value = currValue;
  }

  if (key.nullable === false && value === null) {
    throw new Error(`Value for key ${key.value} is null`);
  }
  if (key.optional === false && value === undefined) {
    throw new Error(`Value for key ${key.value} is undefined`);
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

const prepareKeysMap = (map: MapperMap, propertiesInfo: PropertyNameWithType[]) => {
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
        value: 
          typeof mapValue.value === 'object'
            ? prepareKeysMap(mapValue.value, property.properties)
            : mapValue.value,
      });
    } else {
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

function getPropertiesInfoOfMethodsReturnType(className: string, methodName: string, filePath: string): PropertyNameWithType[] {
  const program = ts.createProgram([filePath], {});
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
      throw new Error(`Error reading source file: ${filePath}`);
  }

  let classDeclaration: ts.ClassDeclaration | undefined;

  visit(sourceFile);

  function visit(node: ts.Node) {
    if (classDeclaration) {
      return;
    }
    if (ts.isClassDeclaration(node) && node.name.getText() === className) {
      classDeclaration = node;
    }
    ts.forEachChild(node, visit);
  }

  const methodDeclaration = classDeclaration!.members.find(
    (member) => ts.isMethodDeclaration(member) && member.name.getText() === methodName
  ) as ts.MethodDeclaration | undefined;

  const returnType = checker.getReturnTypeOfSignature(checker.getSignatureFromDeclaration(methodDeclaration!));

  function getPropertiesAndTypes(type: ts.Type, checker: ts.TypeChecker) {
    const properties = type.getProperties();
    const propertiesInfo: PropertyNameWithType[] = []

    properties.forEach(property => {
        const propertyType = checker.getTypeOfSymbolAtLocation(property, property.valueDeclaration!);
        
        const typeString = checker.typeToString(propertyType);
        if (isPrimitiveType(typeString)) {
          propertiesInfo.push({
            name: property.getName(),
            type: typeString,
            properties: []
          });
          return;
        }
        // console.log(checker.)
        propertiesInfo.push({
          name: property.getName(),
          type: 'object',
          properties: getPropertiesAndTypes(propertyType, checker),
        });
    });

    return propertiesInfo;
  }

  return getPropertiesAndTypes(returnType, checker);
}

function isPrimitiveType(type: string) {
  return [
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol',
    'undefined',
  ].includes(type);
}