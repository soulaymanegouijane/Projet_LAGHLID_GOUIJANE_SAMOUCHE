import { Box, Grid, styled, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Material } from '../components/Material';
import { PageTitle } from '../components/PageTitle';
import { TabsButtons } from '../components/Tabs';
import { Store } from '../context/Store';
import { useCategories } from '../hooks/useCategories';
import { useMaterials } from '../hooks/useMaterials';
import { useDemandOffer } from '../hooks/useDemandOffer';
import { MaterialDto } from '../types';

export const MaterialsPage = () => {
  const [filtredMaterials, setFiltredMaterials] = useState<MaterialDto[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const {
    state: {
      auth: { token, user },
    },
  } = useContext(Store);
  const { data: categories, error, isLoading } = useCategories();
  const {
    data: materials,
    error: errorMaterials,
    isLoading: loadingMaterials,
  } = useMaterials();
  const { mutate: demandMaterial } = useDemandOffer();

  const sendDemand = (id: string) => {
    demandMaterial({ id, token });
    alert('Demande envoyée');
  };

  useEffect(() => {
    if (!materials || !categories) {
      return;
    }
    if (currentCategory === 0) {
      setFiltredMaterials(materials);
    } else {
      setFiltredMaterials(
        materials.filter((material) =>
          material.categoryIds.includes(
            categories[currentCategory - 1].id as string,
          ),
        ),
      );
    }
  }, [currentCategory, materials]);

  if (error || errorMaterials) {
    return <Typography variant="body1">Error</Typography>;
  }

  if (isLoading || loadingMaterials) {
    return <Typography variant="body1">Loading</Typography>;
  }

  return (
    <Box>
      <PageTitle>Matériels disponibles</PageTitle>
      <Container>
        {categories && (
          <TabsButtons
            options={categories?.map((category) => category.name)}
            value={currentCategory}
            onChange={setCurrentCategory}
          />
        )}
        <Grid container spacing={5}>
          {filtredMaterials?.map((m) => (
            <Grid item key={m.id} xs={12} md={6} lg={4}>
              <Material {...m} user={user} demand={sendDemand} />
            </Grid>
          ))}
        </Grid>
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
