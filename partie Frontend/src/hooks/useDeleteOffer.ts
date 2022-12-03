import { useContext } from 'react';
import axios from 'axios';
import { Store } from '../context/Store';
import { getHeader } from '../utils/AuthorizationConfig';
import { useQueryClient } from 'react-query';
import Swal from "sweetalert2";

export const useDeleteOffer = () => {
  const queryClient = useQueryClient();
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
    try{
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/representer/offers/${offerId}`,
        config,
      );
      queryClient.invalidateQueries('myOffers')
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Votre offre est ajoutée',
        showConfirmButton: false,
        timer: 1500
      })
    } catch{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Un problème est survenue!'
      })
    }
   
  };

  return deleteOffer;
};
