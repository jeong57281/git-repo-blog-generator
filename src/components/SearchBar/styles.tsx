import styled from 'styled-components';

export const SearchBarLayout = styled.div`
  width: 100%;
  display: flex;
  padding: 1.25rem;
`;

export const SearchBarInput = styled.input`
  width: 100%;
  border: none;
  font-size: 1.25rem;
  padding-left: 1.25rem;
  &:focus {
    outline: none;
  }
`;
