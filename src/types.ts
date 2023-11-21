export type MapFunction = (params: any) => any;

export type MapValidateObj = {
  value: string | MapFunction;
  nullable?: boolean;
  optional?: boolean;
}

export type MapValue = string | MapFunction | MapValidateObj;

export type KeysMapValue = MapValidateObj & {
  type: string;
};

export type KeysMap = Map<string, KeysMapValue>;

export type MapperMap = {
  [key: string]: MapValue
};

export type PropertyNameWithType = {
  name: string;
  type: string;
};
