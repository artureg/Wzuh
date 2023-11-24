export type MapFunction = (params: any) => any;

export type MapValidateObj = {
  value: string | MapFunction | MapperMap;
  nullable?: boolean;
  optional?: boolean;
}

export type MapValue = string | MapFunction | MapValidateObj;

export type MapperMap = {
  [key: string]: MapValue
};

export type KeysMapValue = {
  type: string;
  value: string | MapFunction | KeysMap;
  nullable?: boolean;
  optional?: boolean;
  propertiesMap?: KeysMap
};

export type KeysMap = Map<string, KeysMapValue>;

export type PropertyNameWithType = {
  name: string;
  type: string;
  properties: PropertyNameWithType[]
};