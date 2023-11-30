// index.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import TestModule from '../src/index';

test('TestModule renders correctly', () => {
  const tree = renderer.create(<TestModule />).toJSON();
  expect(tree).toMatchSnapshot();
});