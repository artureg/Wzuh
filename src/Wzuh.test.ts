import { test } from 'node:test';
import { Mapper } from './Wzuh';
import assert from 'assert';

test('should map properties correctly', () => {
  class MyClass1 {
    @Mapper({
      map: {
        prop1: 'property1',
        prop2: 'property2.nestedProperty',
        prop3: {
          value: {
            subProp1: 'property3.subProperty1',
            subProp2: 'property3.subProperty2',
            subProp3: 'property1'
          },
        },
        prop4: (params: any) => `${params.property1} ${params.property2.nestedProperty}`
      },
    })
    static myMethod(params: any): typeof expected {
      return;
    }
  }

  const params = {
    property1: 'value1',
    property2: {
      nestedProperty: 'value2',
    },
    property3: {
      subProperty1: 'value3',
      subProperty2: 'value4',
    },
  };

  const result = MyClass1.myMethod(params);
  const expected = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: {
      subProp1: 'value3',
      subProp2: 'value4',
      subProp3: 'value1',
    },
    prop4: 'value1 value2',
  };
  console.log(result)

  assert.deepEqual(result, expected);
});

test('should exclude properties correctly', () => {
  class MyClass2 {
    @Mapper({
      exclude: ['prop2'],
    })
    static myMethod(params: any): typeof expected {
      return;
    }
  }

  const params = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
  };

  const result = MyClass2.myMethod(params);
  const expected = {
    prop1: 'value1',
    prop3: 'value3',
  };

  assert.deepEqual(result, expected);
});

test('should handle nullable and optional properties correctly', () => {
  class MyClass3 {
    @Mapper({
      map: {
        prop1: {
          value: 'property1',
          nullable: false,
        },
        prop2: {
          value: 'property2',
          optional: false,
        },
      },
    })
    static myMethod(params: any): {
      prop1: string,
      prop2: string,
    } {
      return
    }
  }

  const params1 = {
    property1: null,
    property2: 'value2',
  };

  assert.throws(() => MyClass3.myMethod(params1),
    new Error('Value for key property1 is null')
  );

  const params2 = {
    property1: 'value1',
    property2: undefined,
  };

  assert.throws(() => MyClass3.myMethod(params2), 
    new Error('Value for key property2 is undefined')
  );
});