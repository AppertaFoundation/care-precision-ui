import styled, { StyledFunction } from 'styled-components/macro';

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 5px;
`;

export const TdFirst = styled.td`
  border-top-left-radius: 35px;
  border-bottom-left-radius: 35px;
  padding-left: 15px;
  text-align: center;
  cursor: pointer;
`;

export const TdLast = styled.td`
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  padding-right: 15px;
  height: 100%;
  text-align: center;
`;

interface Props {
  center?: boolean;
}
const td: StyledFunction<Props & any> = styled.td;

export const ColumnBadged = td`
  background-color: #29375d;
  border-radius: 35px;
  padding: 9px 8px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  text-align: ${props => ((props as any)?.center ? 'center' : 'left')};
  max-width: 110px;
`;
