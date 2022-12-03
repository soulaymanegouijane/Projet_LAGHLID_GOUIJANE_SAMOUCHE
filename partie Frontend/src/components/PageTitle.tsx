import { styled, Typography } from '@mui/material';
import { FunctionComponent } from 'react';

interface Props {
  children: React.ReactNode;
}

export const PageTitle: FunctionComponent<Props> = ({ children }) => {
  return (
    <Container>
      <Text variant="h5">{children}</Text>
    </Container>
  );
};

const Container = styled('div')`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-bottom: 1px solid #dadada;
  margin-bottom: 1.5rem;
`;

const Text = styled(Typography)`
  padding: 1rem 2rem;
`;
