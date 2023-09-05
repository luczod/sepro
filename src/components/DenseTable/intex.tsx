import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BoxStyle } from "./styles";
import { IDados } from "../../utils/interfaces";

export default function DenseTable(props: IDados[]) {
  return (
    <TableContainer sx={BoxStyle} component={Paper}>
      <Table sx={BoxStyle} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Código</strong>
            </TableCell>
            <TableCell>
              <strong>Descrição</strong>
            </TableCell>
            <TableCell>
              <strong>Valor</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((row) => (
            <TableRow
              key={row.codigo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.codigo}</TableCell>
              <TableCell align="left">{row.texto}</TableCell>
              <TableCell align="left">{row.valor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
