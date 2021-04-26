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
         <Button className="good" onClick={handleClick} name="good" type="submit" >Good</Button>
         <Button className="bad" onClick={handleClick} name="bad" type="submit">Bad</Button>
      </Wrapper>
   )
};

const Wrapper = styled.div`
margin-top:13px;
display:flex;
`


const Button = styled.button`
   margin:10px;
   width:100%;
   padding:5px 10px;
   border-radius:10px;
   outline:none;
   background-color:#3F3F3F;
   color:white;

   &.good{

   }

   &.bad{

   }
   `
