import { FC, useCallback, useState, } from 'react';
import styled from "styled-components/macro";

import { Card } from '../../../types';
import { useMainContext } from '../../../utils';
import { CardAnswers } from '../card-answers'

interface Props {
   card: Card;
}


export const CardFrontInner: FC<Props> = ({ card }) => {
   const [showAnswer, setShowAnswer] = useState(false)

   const { status, collectionName, _id: id, goodAnswers, badAnswers } = card


   const { isTestMode } = useMainContext()

   const onShowAnswer = useCallback(
      () => {
         setShowAnswer(true)
      },
      [setShowAnswer],
   )

   return (
      <Container>
         <Inner onClick={onShowAnswer} >
            <CardAnswers card={card} onShowAnswer={onShowAnswer} showAnswer={showAnswer} />
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

   &:hover{
      cursor: pointer;
   }
`

const Container = styled.div`
   height:275px;
   background: linear-gradient(#F7F8FA, #C8C8C7);
   border-top-left-radius: 25px;
   border-top-right-radius: 25px;

   
   .separate-line{
   box-shadow: 0px -2px 10px 1px #3f3f3f;
   }
`
