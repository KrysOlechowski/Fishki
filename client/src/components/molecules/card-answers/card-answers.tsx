import clsx from 'clsx';
import { FC, useCallback } from 'react';
import styled from "styled-components/macro";
import { Card, CardStatus } from '../../../types';
import { useEditCard, useMainContext } from '../../../utils';



interface Props {
   card: Card;
}



export const CardAnswers: FC<Props> = ({ card }) => {

   const { editAnswer } = useEditCard()
   const context = useMainContext()
   const handleClick = useCallback(
      (e) => {
         e.preventDefault()
         const answer = e.target.name
         const { goodAnswers, badAnswers } = card

         const lessonModeCopy = context.lessonMode
         if (answer === "good") {
            const increasedAnswer = context.lessonMode.goodAnswers + 1
            context.setLessonMode({ ...lessonModeCopy, goodAnswers: increasedAnswer })

            editAnswer({ id: card._id, goodAnswers: goodAnswers + 1, status: CardStatus.good })
         } else {
            const increasedAnswer = context.lessonMode.badAnswers + 1
            context.setLessonMode({ ...lessonModeCopy, badAnswers: increasedAnswer })
            editAnswer({ id: card._id, badAnswers: badAnswers + 1, status: CardStatus.bad })
         }

      },
      [editAnswer, card, context,],
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
