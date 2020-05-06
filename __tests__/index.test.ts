import { hello } from '../src/index';

it('hello()の確認', () => {
  expect(hello('world')).toBe('Hello, world!');
});
