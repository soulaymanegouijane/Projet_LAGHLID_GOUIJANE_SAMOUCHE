import { useQuery } from 'react-query';
import axios from 'axios';
import { Category } from '../types/index';

export const useCategories = () => {
  const getCategories = async (): Promise<Category[]> => {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/categories`,
    );
    return data;
  };

  const { data, isLoading, error } = useQuery(
    'materiel-categories',
    getCategories,
  );

  return {
    data,
    isLoading,
    error,
  };
};
