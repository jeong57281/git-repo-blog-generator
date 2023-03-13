import * as ACTION_TYPES from '../actions/actionsType';

export interface StateType {
  ext: string | null;
  date: Date | null;
  keyword: string;
}

export interface ActionType {
  type: ACTION_TYPES.UPDATE_FILTER;
  ext?: string;
  date?: Date;
  keyword?: string;
}

export const initialState = {
  ext: null,
  date: null,
  keyword: '',
};

export const reducer = (
  state: StateType = initialState,
  action: ActionType
): StateType => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_FILTER.CHANGE_KEYWORD:
      return { ...state, keyword: action.keyword || '' };
    case ACTION_TYPES.UPDATE_FILTER.CHANGE_DATE:
      if (!action.date || !(action.date instanceof Date)) {
        return state;
      }

      if (state.date?.toDateString() === action.date.toDateString()) {
        return { ...state, date: null };
      }

      return { ...state, date: action.date };
    case ACTION_TYPES.UPDATE_FILTER.CHANGE_EXT:
      if (!action.ext || typeof action.ext !== 'string') {
        return state;
      }

      if (state.ext === action.ext) {
        return { ...state, ext: null };
      }

      return { ...state, ext: action.ext };
    default:
      return state;
  }
};
