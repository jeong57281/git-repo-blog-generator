import styled, { css } from 'styled-components';
import { mixin } from '@styles';

export const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 1rem;
`;

export const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;

  ${mixin.mobile(css`
    flex-direction: column;
  `)}
`;
