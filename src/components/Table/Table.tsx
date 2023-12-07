import React from "react";
import TableMUI from "@mui/joy/Table";
import "./Table.css";
import { TableProps } from "./Table.types";
import { Sheet } from "@mui/joy";

const Table = ({ values }: TableProps) => {
  const totalSum = values.reduce((acc, curr) => {
    return acc + (curr.convertedAmount ? +curr.convertedAmount : 0);
  }, 0);

  return (
    <Sheet className="sheet">
      <TableMUI
        aria-label="basic table"
        color="neutral"
        size="md"
        stickyHeader
        stickyFooter
      >
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Currency</th>
            <th style={{ textAlign: "center" }}>Amount</th>
            <th style={{ textAlign: "center" }}>Conversion ($)</th>
          </tr>
        </thead>
        <tbody>
          {values.map((value) => (
            <tr>
              <td>{value.currency}</td>
              <td>{value.amount}</td>
              <td>{value.convertedAmount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3} className="center">
              Total sum: {totalSum} $
            </td>
          </tr>
        </tfoot>
      </TableMUI>
    </Sheet>
  );
};

export default Table;
