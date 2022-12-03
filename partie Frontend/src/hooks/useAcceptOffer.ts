import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { getHeader } from '../utils/AuthorizationConfig';

interface AcceptOfferDto {
  token: string | null;
  offerId: string;
}

export const useAcceptOffer = () => {
  const queryClient = useQueryClient();
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

  const { mutate, isLoading, error } = useMutation(acceptOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries('demands')
    }
  });

  return {
    acceptOffer: mutate,
    isLoading,
    error,
  };
};
