import React from 'react';
import { Table as TableElement, ColumnBadged } from './style';

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
const Table: React.FC<Props> = ({ children }) => {
  return (
    <TableElement>
      <thead>
        <tr>
          <ColumnBadged>Location</ColumnBadged>
          <ColumnBadged>Names, NHS</ColumnBadged>
          <ColumnBadged>DENWIS</ColumnBadged>
          <ColumnBadged>COVID</ColumnBadged>
          <ColumnBadged>SEPSIS</ColumnBadged>
          <ColumnBadged>NEWS 2</ColumnBadged>
          <ColumnBadged>Action</ColumnBadged>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </TableElement>
  );
};
export { Table };
