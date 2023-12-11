import { render, fireEvent, screen } from '@testing-library/react';
import SendNativeToken from '../src/components/SendNativeToken';

test('renders SendNativeToken component', () => {
  render(
    <SendNativeToken
      receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511"
      chain={1}
      style={{ margin: '10px' }}
      unstyled={false}
      debug={true}
      disableSendOnEnter={false}
      onlyEstimate={false}
    />
  );

  const inputElement = screen.getByPlaceholderText('Enter receiver address');
  expect(inputElement).toBeInTheDocument();
});

test('handles input change', () => {
  render(
    <SendNativeToken
      receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511"
      chain={1}
      style={{ margin: '10px' }}
      unstyled={false}
      debug={true}
      disableSendOnEnter={false}
      onlyEstimate={false}
    />
  );

  const inputElement = screen.getByPlaceholderText('Enter receiver address');
  fireEvent.change(inputElement, { target: { value: 'newAddress' } });
  expect(inputElement.value).toBe('newAddress');
});

test('handles enter key press', () => {
  render(
    <SendNativeToken
      receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511"
      chain={1}
      style={{ margin: '10px' }}
      unstyled={false}
      debug={true}
      disableSendOnEnter={false}
      onlyEstimate={false}
    />
  );

  const inputElement = screen.getByPlaceholderText('Enter receiver address');
  fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
});