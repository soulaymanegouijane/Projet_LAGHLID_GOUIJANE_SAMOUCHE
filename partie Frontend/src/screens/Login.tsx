import { Button, Paper, styled, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login } from '../context/actions/authentication';
import { Store } from '../context/Store';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);

  const {
    auth: { user },
  } = state;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    login(dispatch, data);
  };

  useEffect(() => {
    if (!user) {
      return;
    }
    navigate('/');
  }, [user, navigate]);

  return (
    <Container>
      <Card>
        <Typography variant="h4">Se connercter</Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                color="secondary"
                inputProps={{ type: 'text' }}
                error={Boolean(errors.username)}
                helperText={errors.username ? 'Email est obligatoire' : ''}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                color="secondary"
                inputProps={{ type: 'password' }}
                error={Boolean(errors.password)}
                helperText={
                  errors.password ? 'Mot de passe est obligatoire' : ''
                }
                {...field}
              />
            )}
          />
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: 'fit-content' }}
            type="submit"
          >
            Se connecter
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

const Container = styled('div')`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Card = styled(Paper)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: min(800px, 90%);
  padding: 2rem;
  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.secondary.main};
`;

const Form = styled('form')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;
