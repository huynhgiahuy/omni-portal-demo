import { Table, TableProps } from 'antd';
import React from 'react';

interface TableComponentProps extends TableProps<any> {}

const TableComponent: React.FC<TableComponentProps> = (props) => {
  return <Table {...props} className="a-table-component" />;
};
export default TableComponent;
