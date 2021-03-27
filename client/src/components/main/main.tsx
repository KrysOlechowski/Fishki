import React, { useEffect } from 'react';
import ky from 'ky'


import { getApiUrl } from '../../utils/api'
interface MainProps {
}

const API_URL = getApiUrl()

export const Main = (props: MainProps) => {


   useEffect(() => {
      console.log(API_URL)
      ky.get(`${API_URL}/blogs`).json().then((response) => {
         console.log(response)
      })
   }, [])
   return (
      <div>
         <h1>test2</h1>
      </div>
   );
};
