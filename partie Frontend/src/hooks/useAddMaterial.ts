import { useMutation } from 'react-query';
import axios from 'axios';
import { getHeader } from '../utils/AuthorizationConfig';

interface AddOfferDto {
  material: {
    title: string;
    description: string;
    categoryIds: string[];
  };
  token: string | null;
}

export const useAddMaterial = () => {
  const addMaterial = async ({ material, token }: AddOfferDto) => {
    if (!token) {
      throw new Error('No token');
    }
    const config = getHeader(token);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/representer/offers`,
      material,
      config,
    );
    return data;
  };

  const { mutate, isLoading, error } = useMutation(addMaterial);

  return {
    mutate,
    isLoading,
    error,
  };
};
