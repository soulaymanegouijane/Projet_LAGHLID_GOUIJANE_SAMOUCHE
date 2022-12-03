import { useQuery } from 'react-query';
import axios from 'axios';
import { Demand } from '../types';
import { getHeader } from '../utils/AuthorizationConfig';

export const useDemands = (token: string | null) => {
  const getDemands = async (): Promise<Demand[]> => {
    if (!token) {
      throw new Error('No token');
    }
    const config = getHeader(token);
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/representer/demands`,
      config,
    );
    return data;
  };

  const { data, isLoading, error } = useQuery('demands', getDemands);

  return {
    data,
    isLoading,
    error,
  };
};
