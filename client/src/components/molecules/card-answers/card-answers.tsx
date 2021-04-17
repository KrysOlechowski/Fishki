import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import { Card } from '../../../types';



interface Props {
   card: Card;
}



export const CardAnswers: FC<Props> = ({ card }) => {

   const handleClick = useCallback(
      (e) => {
         e.preventDefault()
         const answer = e.target.name
      },
      [],
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
