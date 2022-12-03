import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  styled,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { RequestedOffer, RequestStatus } from '../lib/interfaces';
import { Button } from '../atoms/Button';
import { Popup } from '../molecules/Popup';
import { useDeclineOffer } from '../hooks/useDeclineOffer';
import { useAcceptOffer } from '../hooks/useAcceptOffer';
import { TextField } from '../atoms/TextField';

interface Props {
  requestedOffers: RequestedOffer[];
}

export const Table: FC<Props> = ({ requestedOffers }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const { enqueueSnackbar } = useSnackbar();
  const { declineOffer, error, loading } = useDeclineOffer();
  const { acceptOffer } = useAcceptOffer();

  const showPopup = useCallback((offerId: string) => {
    setSelectedOfferId(offerId);
    setOpenPopup(true);
  }, []);

  const closePopup = useCallback(() => {
    setOpenPopup(false);
  }, []);

  const rejectDemand = useCallback(() => {
    if (selectedOfferId) {
      declineOffer(selectedOfferId);
    }
    closePopup();
  }, [closePopup, declineOffer, selectedOfferId]);

  useEffect(() => {
    if (!error) {
      return;
    }
    enqueueSnackbar(error, {
      variant: 'error',
    });
    closePopup();
  }, [error, enqueueSnackbar, closePopup]);

  return (
    <TableContainer component={Paper}>
      <Popup
        title="Veuillez indiquer la raison du refus"
        open={openPopup}
        loading={loading}
        onClose={closePopup}
      >
        <>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              minRows={4}
              placeholder="Raison de refus"
              required
            />
          </DialogContent>
          <PopupActions>
            <Button onClick={closePopup} color="secondary">
              Disagree
            </Button>
            <Button
              onClick={rejectDemand}
              color="secondary"
              variant="contained"
            >
              Envoyer
            </Button>
          </PopupActions>
        </>
      </Popup>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Matériel</TableCell>
            <TableCell>Demandeur</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestedOffers?.map((request) => (
            <TableRow key={request.id}>
              <TableCell component="th" scope="row">
                {request.offerName}
              </TableCell>
              <TableCell>{request.requestor}</TableCell>
              <TableCell align="right">
                {request.status === RequestStatus.ACCEPTE ? (
                  <Alert severity="success">Accepte</Alert>
                ) : request.status === RequestStatus.REFUSE ? (
                  <Alert severity="error">Refuse</Alert>
                ) : (
                  <Actions>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => acceptOffer(request.id)}
                    >
                      Accepter
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => showPopup(request.id)}
                    >
                      Refuser
                    </Button>
                  </Actions>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

const Actions = styled('div')`
  display: flex;
  gap: 1rem;
  & > button {
    padding: 0.5em 1em;
    font-size: 0.75rem;
  }
`;

const PopupActions = styled(DialogActions)`
  padding: 0.5rem 2rem;
`;
