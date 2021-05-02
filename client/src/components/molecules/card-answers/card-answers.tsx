import { FC, useCallback, useMemo } from 'react';
import styled from "styled-components/macro";

import { Card } from '../../../types';
import { getVisibleAndHiddenText } from '../../../utils';
import { PercentageColumns } from '../percentage-columns';


interface Props {
   card: Card;
   onShowAnswer: () => void;
   showAnswer: boolean;
}


export const CardAnswers: FC<Props> = ({ card, showAnswer, onShowAnswer }) => {
   const { front, back, goodAnswers, badAnswers } = card
   const cardAnswers = useMemo(() => getVisibleAndHiddenText(front, back), [front, back])
   const isNewCard = goodAnswers===0&&badAnswers===0


   const toggleAnswer = useCallback(
      () => {
         onShowAnswer()
      },
      [onShowAnswer],
   )



   const { visibleText, hiddenText } = cardAnswers
   
   return (
      <Container onClick={toggleAnswer}>
         <h3>{visibleText}</h3>
         <div className="separate-answer"></div>
         {showAnswer ? <h3>{hiddenText}</h3> : <h3>Show Answer</h3>}

         {showAnswer&&!isNewCard&&(
            <PercentageColumns firstColumn={goodAnswers} secondColumn={badAnswers}/>
         )}
      </Container>
   )
};



const Container = styled.div`
   height:100%;

   .separate-answer{
      border-bottom:1px solid white;
   }
`
