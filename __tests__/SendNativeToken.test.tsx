import {render, fireEvent, cleanup } from '@testing-library/react';
import SendNativeToken from '../src/components/SendNativeToken/index';

afterEach(cleanup);
test('Send native token renders correctly', () => {
  const tree = render(<SendNativeToken
    receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511"
    chain={1} 
    className= 'block w-1/2 rounded-md border-1 border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    unstyled={false} 
    debug={true}
    disableSendOnEnter={false}
    onlyEstimate={false}
  />);
  expect(tree).toMatchSnapshot();
});

test('input value updates correctly', () => {
  // Arrange
  const { getByPlaceholderText } = render(<SendNativeToken
    receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511"
    chain={1} 
    className= 'block w-1/2 rounded-md border-1 border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    unstyled={false} 
    debug={true}
    disableSendOnEnter={false}
    onlyEstimate={false}
  />
  );

  // Act: Change the input value
  const inputElement = getByPlaceholderText('Enter Amount');
  fireEvent.change(inputElement, { target: { value: '0.001' } });

  // Assert: Check if the input value has been updated
  expect(inputElement.value).toBe('0.001');
});

test('input value updates correctly', () => {
  // Arrange
  const { getByPlaceholderText } = render(<SendNativeToken
    receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511"
    chain={1} 
    className= 'block w-1/2 rounded-md border-1 border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    unstyled={false} 
    debug={true}
    disableSendOnEnter={false}
    onlyEstimate={false}
  />
  );

  // Act: Change the input value
  const inputElement = getByPlaceholderText('Enter Amount');
  fireEvent.keyDown(inputElement, { target: { value: '0.001' } });

  // Assert: call function of send
  expect(inputElement.value).toBe('0.001');
});