import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { getHeader } from '../utils/AuthorizationConfig';

interface RejectOfferDto {
  token: string | null;
  offerId: string;
  comment: string;
}

export const useRejectOffer = () => {
  const queryClient = useQueryClient();
  const rejectOffer = ({ offerId, comment, token }: RejectOfferDto) => {
    if (!token) {
      throw new Error('Missing token');
    }
    const config = getHeader(token);
    return axios.put(
      `${process.env.REACT_APP_API_URL}/representer/demands/${offerId}/reject`,
      {
        comment,
      },
      config,
    );
  };

  const { mutate, isLoading, error } = useMutation(rejectOffer, {
    onSuccess: () => {
      queryClient.invalidateQueries('demands')
    }
  });

  return {
    rejectOffer: mutate,
    isLoading,
    error,
  };
};
