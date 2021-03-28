import { FC } from 'react';
import { CreatedStatus } from '../../types';


interface Props {
   status?: CreatedStatus;
}



export const CreateCardStatus: FC<Props> = ({ status }) => {


   if (status === CreatedStatus.NEW) {
      return (
         <>
            <h3>Create card</h3>
         </>
      )
   } else if (status === CreatedStatus.CREATED) {
      return (
         <>
            <h3>Card Created</h3>
         </>
      )
   } else if (status === CreatedStatus.FAILED) {
      return (
         <>
            <h3>Creatind card failed</h3>
         </>
      )
   } else {
      return (
         <>
            <h3>...</h3>
         </>
      )
   }
};

