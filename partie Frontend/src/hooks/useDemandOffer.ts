import { useMutation } from 'react-query';
import axios from 'axios';
import { getHeader } from '../utils/AuthorizationConfig';

interface DemandOffer {
  id: string;
  token: string | null;
}

export const useDemandOffer = () => {
  const demandOffer = async ({ id, token }: DemandOffer) => {
    if (!token) {
      throw new Error('No token');
    }
    const config = getHeader(token);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/offers/${id}/demand`,
      {},
      config,
    );
    return data;
  };

  const { mutate, isLoading, error } = useMutation(demandOffer);

  return {
    mutate,
    isLoading,
    error,
  };
};
