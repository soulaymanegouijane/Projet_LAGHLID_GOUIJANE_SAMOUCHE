import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Alert, LoadingButton } from '@mui/lab';
import { FunctionComponent } from 'react';
import { Demand, DemandStatus } from '../types';

interface Props {
  rows: Demand[];
  requestId: string | null;
  acceptRequest: (requestId: string) => void;
  loadingAcceptRequest: boolean;
  refuseRequest: (requestId: string) => void;
  loadingRefuseRequest: boolean;
}

export const Table: FunctionComponent<Props> = ({
  rows,
  requestId,
  acceptRequest,
  loadingAcceptRequest,
  refuseRequest,
  loadingRefuseRequest,
}) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Matériel</TableCell>
            <TableCell>Demandeur</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.offerTitle}
              </TableCell>
              <TableCell>{row.demanderUsername}</TableCell>
              {row.status === DemandStatus.ACCEPTED ? (
                <Alert severity="success">Demande acceptée</Alert>
              ) : row.status === DemandStatus.REFUSED ? (
                <Alert severity="error">Demande refusée</Alert>
              ) : (
                <>
                  <TableCell>
                    <LoadingButton
                      variant="outlined"
                      color="secondary"
                      loading={row.id === requestId && loadingAcceptRequest}
                      onClick={() => acceptRequest(row.id)}
                    >
                      Accepter
                    </LoadingButton>
                  </TableCell>
                  <TableCell>
                    <LoadingButton
                      variant="outlined"
                      color="error"
                      loading={loadingRefuseRequest}
                      onClick={() => refuseRequest(row.id)}
                    >
                      Refuser
                    </LoadingButton>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
