import { FC } from 'react';
import { CardCreateStatus } from '../../types';


interface Props {
   status?: CardCreateStatus;
}



export const CreateCardStatus: FC<Props> = ({ status }) => {


   if (status === CardCreateStatus.NEW) {
      return (
         <>
            <h3>Create card</h3>
         </>
      )
   } else if (status === CardCreateStatus.CREATED) {
      return (
         <>
            <h3>Card Created</h3>
         </>
      )
   } else if (status === CardCreateStatus.FAILED) {
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

