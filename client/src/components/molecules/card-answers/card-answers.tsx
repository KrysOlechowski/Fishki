import { FC, useCallback, useMemo } from 'react';
import styled from "styled-components/macro";

import { Card } from '../../../types';
import { getVisibleAndHiddenText } from '../../../utils';


interface Props {
   card: Card;
   onShowAnswer: () => void;
   showAnswer: boolean;
}


export const CardAnswers: FC<Props> = ({ card, showAnswer, onShowAnswer }) => {
   const { front, back } = card
   const cardAnswers = useMemo(() => getVisibleAndHiddenText(front, back), [front, back])

   const toggleAnswer = useCallback(
      () => {
         onShowAnswer()
      },
      [onShowAnswer],
   )

   console.log(cardAnswers)
   const { visibleText, hiddenText } = cardAnswers
   return (
      <Container onClick={toggleAnswer}>
         <h3>{visibleText}</h3>
         <div className="separate-answer"></div>
         {showAnswer ? <h3>{hiddenText}</h3> : <h3>Show Answer</h3>}
      </Container>
   )
};



const Container = styled.div`

   .separate-answer{
      border-bottom:1px solid white;
   }
`
