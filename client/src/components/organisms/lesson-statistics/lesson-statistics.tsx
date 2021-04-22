import { FC, useMemo, } from 'react';
import styled from "styled-components/macro";
import { useMainContext } from '../../../utils';



interface Props {
}


export const LessonStatistics: FC<Props> = () => {
   const { lessonMode } = useMainContext()
   const numberOfCards = useMemo(() => lessonMode.numberOfCards, [lessonMode.numberOfCards])
   const goodAnswers = useMemo(() => lessonMode.goodAnswers, [lessonMode.goodAnswers])
   const badAnswers = useMemo(() => lessonMode.badAnswers, [lessonMode.badAnswers])


   return (
      <Wrapper>
         <h1>lesson statistics</h1>
         <h3>Number Of Cards: {numberOfCards}</h3>
         <h3>Good Answers: {goodAnswers}</h3>
         <h3>Bad Answers: {badAnswers}</h3>
      </Wrapper >
   )
};


const Wrapper = styled.div`
border:1px solid white;
`
