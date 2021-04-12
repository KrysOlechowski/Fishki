import { FC, useCallback } from 'react';
import { createNewCollection } from '../../utils';


interface Props {
}



export const CreateCollection: FC<Props> = () => {

   const onCreateCollection = useCallback(
      (e) => {
         e.preventDefault()
         createNewCollection("lolo").then((result) => {
            console.log(result)
         })
      },
      [],
   )

   return (
      <div>
         <form onSubmit={onCreateCollection}>
            Create collection:
               <button >Create Colection</button>
         </form>

      </div>
   )
};

