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
   const { lessonMode, setLessonMode } = useMainContext()
   const handleClick = useCallback(
      (e) => {
         e.preventDefault()
         const answer = e.target.name
         const { goodAnswers, badAnswers } = card
         const lesson = lessonMode
         if (answer === "good") {
            const increasedAnswer = lessonMode.goodAnswers + 1
            setLessonMode({ ...lesson, goodAnswers: increasedAnswer })
            editAnswer({ id: card._id, goodAnswers: goodAnswers + 1, status: CardStatus.good })
         } else {
            const increasedAnswer = lessonMode.badAnswers + 1
            setLessonMode({ ...lesson, badAnswers: increasedAnswer })
            editAnswer({ id: card._id, badAnswers: badAnswers + 1, status: CardStatus.bad })
         }
      },
      [card, lessonMode, setLessonMode, editAnswer],
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
