import { useContext } from 'react';
import axios from 'axios';
import { Store } from '../context/Store';
import { getHeader } from '../utils/AuthorizationConfig';

export const useDeleteOffer = () => {
  const {
    state: {
      auth: { token },
    },
  } = useContext(Store);

  if (!token) {
    throw new Error('No token');
  }

  const config = getHeader(token);

  const deleteOffer = async (offerId: string) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/representer/offers/${offerId}`,
      config,
    );
  };

  return deleteOffer;
};
