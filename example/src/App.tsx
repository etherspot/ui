import React, { useRef } from 'react';
 import {
  SendNativeToken
} from '@etherspot/etherspot-ui'; 

const App = () => {

  const triggerElementRef = useRef<HTMLButtonElement>(null);

  return (
  <div className="flex items-center"> 
     <SendNativeToken
        receiverAddress="0x725404c8Eead111d9E6DFE118c535F43402a9511" // (we will set using contextprovider)
        chain={1} // Chain ID (we will set using contextprovider)
        className= 'block w-1/2 rounded-md border-1 border-gray-300 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        unstyled={false} 
        debug={true}
        triggerElement={triggerElementRef}
        disableSendOnEnter={false}
        onlyEstimate={false}
      />
      <div className="mt-6">
        <button className="px-4 py-2 rounded w-36 bg-gray-200 text-black" ref={triggerElementRef}>Send</button>
      </div>
     
  </div>
  );
};
export default App;