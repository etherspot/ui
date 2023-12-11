

import React from 'react';
import {
  SendNativeToken
} from '@etherspot/etherspot-ui';

const App = () => {
  return (
  <div>
      <SendNativeToken
        receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511" // (we will set using contextprovider)
        chain={1} // Chain ID (we will set using contextprovider)
        style={{ margin: '10px' }} 
        unstyled={false} 
        debug={true}
        disableSendOnEnter={false}
        onlyEstimate={false}
      />
  </div>
  );
};
export default App;