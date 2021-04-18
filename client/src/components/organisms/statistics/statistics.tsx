import clsx from 'clsx';
import { FC, useMemo } from 'react';
import styled from "styled-components/macro";
import { useMainContext } from '../../../utils';



interface Props {
}



export const Statistics: FC<Props> = () => {
   const {cards}=useMainContext()

   const numberOfAllCards = useMemo(() => cards.length, [cards.length])

   return (
      <Wrapper>
      <h1>Statistics :</h1>
      <h1>Number of cards: {numberOfAllCards}</h1>
      </Wrapper>
   )
};

const Wrapper = styled.div`

border:1px solid white;
width:50%;
color:white;
`
