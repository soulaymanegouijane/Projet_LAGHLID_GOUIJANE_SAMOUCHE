import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LoadingButton } from '@mui/lab';
import { FunctionComponent } from 'react';
import { MaterialDto } from '../types';

interface Props {
  rows: MaterialDto[];
  handleDelete: (id: string) => void;
}

export const MyOffersTable: FunctionComponent<Props> = ({
  rows,
  handleDelete,
}) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Matériel</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <LoadingButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(row.id)}
                >
                  Supprimer
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
