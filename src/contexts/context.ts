import React from 'react';
import type { StateType, ActionType } from '../store/reducers/filterReducer';

interface ContextType {
  stateFilterReducer: StateType;
  dispatchFilterReducer: (actions: ActionType) => void;
}

const Context = React.createContext<ContextType>({
  stateFilterReducer: { ext: null, date: null },
  dispatchFilterReducer: () => {},
});

export default Context;
