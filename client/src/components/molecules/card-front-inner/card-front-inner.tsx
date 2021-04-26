import { FC, } from 'react';
import styled from "styled-components/macro";
import { Card } from '../../../types';
import { useMainContext } from '../../../utils';


interface Props {
   card: Card;
}


export const CardFrontInner: FC<Props> = ({ card }) => {
   const { front, back, status, collectionName, _id: id, goodAnswers, badAnswers } = card
   const { isTestMode } = useMainContext()

   return (
      <Container>
         <Inner>
            <h3>{front}</h3>
            <div className="separate-answer"></div>
            <h3>{back}</h3>
            {
               isTestMode && (
                  <>
                     <h3>status: {status}</h3>
                     <h3>collection: {collectionName}</h3>
                     <h3>Good: {goodAnswers}</h3>
                     <h3>Bad: {badAnswers}</h3>
                     <h3>id: {id}</h3>

                  </>
               )
            }
         </Inner>
         <div className="separate-line"></div>
      </Container>
   )
};

const Inner = styled.div`
   height:100%;
      padding:20px;
`

const Container = styled.div`
   height:275px;
   background-color:pink;

   background: linear-gradient(#F7F8FA, #C8C8C7);

   .separate-answer{
      border-bottom:1px solid white;
   }
   
   .separate-line{
   box-shadow: 0px -2px 10px 1px #3f3f3f;
   }
`
