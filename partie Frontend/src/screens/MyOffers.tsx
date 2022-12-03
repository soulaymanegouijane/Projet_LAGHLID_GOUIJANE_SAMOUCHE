import {
  Autocomplete,
  Box,
  Button,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ButtonsGroup } from '../components/ButtonsGroup';
import { Modal } from '../components/Modal';
import { MyOffersTable } from '../components/MyOffersTable';
import { PageTitle } from '../components/PageTitle';
import { Store } from '../context/Store';
import { useAddMaterial } from '../hooks/useAddMaterial';
import { useCategories } from '../hooks/useCategories';
import { useDeleteOffer } from '../hooks/useDeleteOffer';
import { useMyOffers } from '../hooks/useMyOffers';
import { Filter, Material as MaterialType, MaterialDto, Role } from '../types';

const formInitialValues = {
  id: '',
  name: '',
  description: '',
  categoryIds: [],
}

export const MyOffersPage = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [filter, setFilter] = useState(Filter.ALL);
  const [filtredOffers, setFiltredOffers] = useState<MaterialDto[]>([]);
  const [material, setMaterial] = useState<MaterialType>(formInitialValues);
  const {
    state: {
      auth: { token, user },
    },
  } = useContext(Store);
  const { data: categories } = useCategories();
  const { mutate: addOffer } = useAddMaterial();
  const { myOffers, refetch } = useMyOffers();
  const deleteOffer = useDeleteOffer();

  const handleMaterialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaterial({ ...material, [e.target.name]: e.target.value });
  };

  const handleDeleteOffer = (id: string) => {
    deleteOffer(id);
    refetch();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addOffer({
      material: { ...material, title: material.name },
      token,
    });
    setAddModalOpen(false);
    setMaterial(formInitialValues)
  };

  useEffect(() => {
    if (!myOffers) {
      return;
    }
    switch (filter) {
      case Filter.ALL:
        setFiltredOffers(myOffers);
        break;

      case Filter.ARCHIVED:
        setFiltredOffers(myOffers.filter((offer) => offer.archived));
        break;
      default:
        setFiltredOffers([]);
    }
  }, [filter, myOffers]);

  useEffect(() =>{
    refetch();
  }, [addModalOpen, material])

  return (
    <Box>
      <PageTitle>Mes offres</PageTitle>
      <Container>
        <TogglesContainer>
          <ButtonsGroup
            options={[Filter.ALL, Filter.ARCHIVED]}
            value={filter}
            onChange={(value: string) => setFilter(value as Filter)}
          />
        </TogglesContainer>
        {user && user.role.includes(Role.ROLE_REPRESENTATIVE) && categories && (
          <>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setAddModalOpen(true)}
            >
              Ajouter une offre
            </Button>
            <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
              <ModalContent>
                <Typography variant="h6">Ajouter une offre</Typography>
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <TextField
                    label="Nom du matériel"
                    variant="outlined"
                    name="name"
                    value={material.name}
                    onChange={handleMaterialChange}
                    fullWidth
                    color="secondary"
                  />
                  <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={material.description}
                    onChange={handleMaterialChange}
                    fullWidth
                    color="secondary"
                  />
                  <Autocomplete
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    filterSelectedOptions
                    onChange={(e, value) => {
                      setMaterial({
                        ...material,
                        categoryIds: value.map((v) => v.id),
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        color="secondary"
                        label="categories"
                      />
                    )}
                  />
                  <Button type="submit" variant="outlined" color="secondary">
                    Ajouter
                  </Button>
                </Form>
              </ModalContent>
            </Modal>
          </>
        )}
        {myOffers && (
          <MyOffersTable
            rows={filtredOffers}
            handleDelete={handleDeleteOffer}
          />
        )}
      </Container>
    </Box>
  );
};

const Container = styled('div')`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalContent = styled('div')`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Form = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TogglesContainer = styled('div')`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
