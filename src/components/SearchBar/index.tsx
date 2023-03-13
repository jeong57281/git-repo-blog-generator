import React, { useState, useContext } from 'react';
import SearchIcon from '@assets/images/search.svg';

import { useDebouncedEffect } from '@hooks/useDebouncedEffect';

import * as ACTION_TYPES from '../../store/actions/actionsType';
import Context from '../../contexts/context';

import { SearchBarLayout, SearchBarInput } from './styles';

function SearchBar() {
  const [word, setWord] = useState<string>('');

  const { dispatchFilterReducer } = useContext(Context);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  useDebouncedEffect(
    () => {
      dispatchFilterReducer({
        type: ACTION_TYPES.UPDATE_FILTER.CHANGE_KEYWORD,
        keyword: word,
      });
    },
    [word],
    1000
  );

  return (
    <SearchBarLayout>
      <SearchIcon />
      <SearchBarInput type="text" value={word} onChange={handleInputChange} />
    </SearchBarLayout>
  );
}

export default SearchBar;
