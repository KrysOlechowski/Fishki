import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import clsx from 'clsx'
import '../../../theme/variables.scss'
import { useMainContext } from '../../../utils';
import { CardComponent } from '../card';



interface Props {
}


export const Lesson: FC<Props> = () => {
   const {cards,activeCardIndex:cardIndex}=useMainContext()

   const [isCompleteLesson,setIsCompleteLesson]=useState(false)
   const [activeCardIndex,setActiveCardIndex]=useState(0)

   const numberOfCards= cards.length

useEffect(() => {
   if(numberOfCards>cardIndex){
      setActiveCardIndex(cardIndex)
   }else{
      setIsCompleteLesson(true)
   }
   console.log(cardIndex)
}, [cardIndex,numberOfCards])



 console.log(activeCardIndex)

   return (
      <Wrapper>
         <h1>{isCompleteLesson?"Lesson Complete":"Lesson"}</h1>
       {cards.length>1&&  <CardComponent card={cards[activeCardIndex]} key={cards[activeCardIndex]._id} />}
      </Wrapper >
   )
};


const Wrapper = styled.div`
border:1px solid white;
`
