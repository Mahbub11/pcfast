import React, { useState } from 'react'
import axiosInstance from '../../utils/axios';
import { BASE_URL } from '../../config';

export default function CheckOutSuccessPage() {
    const [busy,isBusy]= useState()


    const handleCheckout = () => {
        axiosInstance
          .post(`${BASE_URL}api/v1/stripe/webhook`, {
         
            userId: 1,
          })
          .then((response) => {
            if (response.data.url) {
              window.location.href = response.data.url;
            }
          })
          .catch((err) => console.log(err.message));
      };
    
  return (
    <div>CheckOutSuccessPage</div>
  )
}
