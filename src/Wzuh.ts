import * as ts from 'typescript';

export function Mapper(map: { 
  [key: string]: string
} = {}) {
  const classFile = _getCallerFile();

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const propertyNames = getPropertyNames(target.name, classFile);
    const keysMap = prepareKeysMap(map, propertyNames);

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

const getValue = (params: object, key: string) => {
  const keys = key.split('.');

  let currValue = params;

  keys.forEach((key) => {
    if (currValue.hasOwnProperty(key)) {
      currValue = currValue[key];
    } else {
      currValue = undefined;
    }
  });

  return currValue;
}

const prepareKeysMap = (map: {
  [key: string]: string
}, propertyNames) => {
  const keysMap = new Map<string, string>();
  propertyNames.forEach((key) => {
    if (map.hasOwnProperty(key)) {
      keysMap.set(key, map[key]);
    } else {
      keysMap.set(key, key);
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

function getPropertyNames(className: string, filePath: string): string[] {
  const program = ts.createProgram([filePath], {});
  const sourceFile = program.getSourceFile(filePath);

  let methodNames: string[] = [];

  function visit(node: ts.Node) {
    if (ts.isClassDeclaration(node)) {
      if (node.name && node.name.text === className) {
        ts.forEachChild(node, (childNode) => {
          if (ts.isPropertyDeclaration(childNode) && childNode.name && ts.isIdentifier(childNode.name)) {
            methodNames.push(childNode.name.text);
          }
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  if (sourceFile) {
    visit(sourceFile);
  } else {
    console.error(`Error reading source file: ${filePath}`);
  }

  return methodNames;
}