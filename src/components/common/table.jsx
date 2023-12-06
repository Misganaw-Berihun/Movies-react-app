import React from "react";
import TableBody from "./tablebody";
import TableHeader from "./tableHeader";

const Table = ({ data, sortColumn, onSort, columns }) => {
  return (
    <table class="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
