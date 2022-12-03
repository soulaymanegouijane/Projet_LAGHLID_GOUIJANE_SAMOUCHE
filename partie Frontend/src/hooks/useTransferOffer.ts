import axios from 'axios';
import { useMutation } from 'react-query';
import { getHeader } from '../utils/AuthorizationConfig';

interface TransferOfferDto {
  token: string | null;
  offerId: string;
}

export const useTransferOffer = () => {
  const transferOffer = async ({ offerId, token }: TransferOfferDto) => {
    if (!token) {
      throw new Error('Missing token');
    }
    const config = getHeader(token);
    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/${offerId}/transfer`,
      {},
      config,
    );
    return data;
  };

  const { mutate, isLoading, error } = useMutation(transferOffer);

  return {
    transferOffer: mutate,
    isLoading,
    error,
  };
};
