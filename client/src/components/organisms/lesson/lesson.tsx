import React, { FC, useEffect, useState } from 'react';
import styled from "styled-components/macro";
import { useMainContext } from '../../../utils';
import { CardComponent } from '../card';
import { LessonStatistics } from '../lesson-statistics'

import '../../../theme/variables.scss'


interface Props {
}


export const Lesson: FC<Props> = () => {
   const { cards, activeCardIndex: cardIndex } = useMainContext()

   const [isCompleteLesson, setIsCompleteLesson] = useState(false)
   const [activeCardIndex, setActiveCardIndex] = useState(0)

   const numberOfCards = cards.length

   useEffect(() => {
      if (numberOfCards > cardIndex) {
         setActiveCardIndex(cardIndex)
      } else if (numberOfCards && numberOfCards === cardIndex) {
         setIsCompleteLesson(true)
      }
   }, [cardIndex, numberOfCards, activeCardIndex])




   return (
      <Wrapper>
         <Counts>
            {activeCardIndex + 1 + " / " + numberOfCards}
         </Counts>

         <h1>{isCompleteLesson ? "Lesson Complete" : "Lesson"}</h1>
         {!isCompleteLesson && cards.length > 1 && <CardComponent card={cards[activeCardIndex]} key={cards[activeCardIndex]._id} />}
         {isCompleteLesson && <LessonStatistics />}
      </Wrapper >
   )
};


const Wrapper = styled.div`
border:1px solid white;
`

const Counts = styled.div` 
border:1px solid white;
font-size:20px;
width:50px;
`
