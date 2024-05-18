
import chain from '../__fixtures__/chain.schema.json';
import { createJSONSchemaPatchOperations, findAllProps } from '../src/utils';
import JSONSchemaPatch from '../src';

function camelCaseTransform(key: string): string {
  return key.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
}

it('findAllProps', () => {
  expect(findAllProps(chain)).toMatchSnapshot();
})


it('createJSONSchemaPatchOperations', () => {
  expect(createJSONSchemaPatchOperations(findAllProps(chain), camelCaseTransform)).toMatchSnapshot();
})

it('JSONSchemaPatch transformer', () => {
  const patcher = new JSONSchemaPatch(chain);
  patcher.transform(camelCaseTransform);
  patcher.applyPatch();
  expect(patcher.schema).toMatchSnapshot();
})