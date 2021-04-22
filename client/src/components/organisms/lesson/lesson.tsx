import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import { useMainContext } from '../../../utils';
import { CardComponent } from '../card';
import { LessonStatistics } from '../lesson-statistics'

import '../../../theme/variables.scss'


interface Props {
}


export const Lesson: FC<Props> = () => {
   const { cards, activeCardIndex: cardIndex, setLessonMode, lessonMode } = useMainContext()

   const [isCompleteLesson, setIsCompleteLesson] = useState(false)
   const [showStatistics, setShowStatistics] = useState(false)
   const [activeCardIndex, setActiveCardIndex] = useState(0)

   const numberOfCards = useMemo(() => cards.length, [cards.length])

   const prepareStatistics = useCallback(
      () => {
         const lesson = lessonMode
         setLessonMode({ ...lesson, numberOfCards: numberOfCards })
         setShowStatistics(true)
      },
      [lessonMode, numberOfCards, setLessonMode],
   )

   useEffect(() => {
      if (isCompleteLesson && !showStatistics) {
         prepareStatistics()
      }
   }, [isCompleteLesson, prepareStatistics, showStatistics])

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
         {showStatistics && <LessonStatistics />}
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
