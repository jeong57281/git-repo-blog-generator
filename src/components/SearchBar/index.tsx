import React from 'react';
import SearchIcon from '@assets/images/search.svg';
import { SearchBarLayout, SearchBarInput } from './styles';

function SearchBar() {
  return (
    <SearchBarLayout>
      <SearchIcon />
      <SearchBarInput type="text" />
    </SearchBarLayout>
  );
}

export default SearchBar;
