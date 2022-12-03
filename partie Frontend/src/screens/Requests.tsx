import { Box, Button, styled, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { ButtonsGroup } from '../components/ButtonsGroup';
import { Modal } from '../components/Modal';
import { PageTitle } from '../components/PageTitle';
import { Table } from '../components/Table';
import { Store } from '../context/Store';
import { useAcceptOffer } from '../hooks/useAcceptOffer';
import { useDemands } from '../hooks/useDemands';
import { useRejectOffer } from '../hooks/useRejectOffer';
import { Demand, Filter } from '../types';

export const RequestsPage = () => {
  const [filter, setFilter] = React.useState<Filter>(Filter.ALL);
  const [showModal, setShowModal] = React.useState(false);
  const [comment, setComment] = React.useState('');
  const [filtredDemands, setFiltredDemands] = React.useState<Demand[]>([]);
  const [selectedRequestId, setSelectedRequestId] = React.useState<
    string | null
  >(null);
  const {
    state: {
      auth: { token },
    },
  } = useContext(Store);
  const { data: requests } = useDemands(token);
  const { acceptOffer, isLoading: isAcceptingDemand } = useAcceptOffer();
  const { rejectOffer, isLoading: isRefusingDemand } = useRejectOffer();

  const closeModal = () => setShowModal(false);

  const handleAcceptRequest = (requestId: string) => {
    acceptOffer({ token, offerId: requestId });
  };

  const handleRefuseRequest = (requestId: string) => {
    setShowModal(true);
    setSelectedRequestId(requestId);
  };

  const rejectRequest = () => {
    if (selectedRequestId && comment) {
      rejectOffer({
        offerId: selectedRequestId,
        comment,
        token,
      });
    }
    setShowModal(false);
  };

  useEffect(() => {
    if (!requests) {
      return;
    }
    switch (filter) {
      case Filter.ALL:
        setFiltredDemands(requests);
        break;
      case Filter.ARCHIVED:
        setFiltredDemands(requests.filter((request) => request.archived));
        break;
      default:
        setFiltredDemands([]);
    }
  }, [filter, requests]);

  return (
    <Box>
      <Modal open={showModal} onClose={closeModal}>
        <ModalContent>
          <Typography variant="h5">
            Voulez-vous vraiment refuser cette demande ?
          </Typography>
          <TextField
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
            rows={4}
            label="Raison du refus"
            color="secondary"
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              width: 'fit-content',
              marginLeft: 'auto',
            }}
            onClick={rejectRequest}
          >
            Valider
          </Button>
        </ModalContent>
      </Modal>
      <PageTitle>Demandes</PageTitle>
      <Container>
        <TogglesContainer>
          <ButtonsGroup
            options={[Filter.ALL, Filter.ARCHIVED]}
            value={filter}
            onChange={(value: string) => setFilter(value as Filter)}
          />
        </TogglesContainer>
        {requests && (
          <Table
            rows={filtredDemands}
            requestId={selectedRequestId}
            loadingAcceptRequest={isAcceptingDemand}
            loadingRefuseRequest={isRefusingDemand}
            acceptRequest={handleAcceptRequest}
            refuseRequest={handleRefuseRequest}
          />
        )}
      </Container>
    </Box>
  );
};

const Container = styled('div')`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalContent = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TogglesContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
