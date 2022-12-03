import axios from 'axios';
import { useMutation } from 'react-query';
import { getHeader } from '../utils/AuthorizationConfig';

interface AcceptOfferDto {
  token: string | null;
  offerId: string;
}

export const useAcceptOffer = () => {
  const acceptOffer = async ({ offerId, token }: AcceptOfferDto) => {
    if (!token) {
      throw new Error('Missing token');
    }
    const config = getHeader(token);
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/representer/demands/${offerId}/accept`,
      {},
      config,
    );
    return data;
  };

  const { mutate, isLoading, error } = useMutation(acceptOffer);

  return {
    acceptOffer: mutate,
    isLoading,
    error,
  };
};
