import React from 'react';

const Context = React.createContext({
  stateFilterReducer: {},
  dispatchFilterReducer: () => {},
});

export default Context;
