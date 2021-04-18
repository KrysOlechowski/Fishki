import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import { Card, CardStatus } from '../../../types';
import { useEditCard } from '../../../utils';



interface Props {
   card: Card;
}



export const CardAnswers: FC<Props> = ({ card }) => {
   const {editCard}=useEditCard()

   const handleClick = useCallback(
      (e) => {
         e.preventDefault()
         const answer = e.target.name
         const {goodAnswers,badAnswers}=card

         if(answer==="good"){
            editCard({id:card._id,goodAnswers:goodAnswers+1,status:CardStatus.good})
         }else{
            editCard({id:card._id,badAnswers:badAnswers+1,status:CardStatus.bad})
         }
      },
      [editCard,card],
   )

  

   return (
      <Wrapper className={clsx("wrapper")}>

         <button onClick={handleClick} name="good" type="submit" >Good</button>
         <button onClick={handleClick} name="bad" type="submit">Bad</button>


      </Wrapper>
   )
};

const Wrapper = styled.div`
margin-top:20px;

button{
   margin-right:20px;
}
`
