import { FC, } from 'react';
import styled from "styled-components/macro";



interface Props {
}


export const LessonStatistics: FC<Props> = () => {

   return (
      <Wrapper>
         <h1>lesson statistics</h1>
      </Wrapper >
   )
};


const Wrapper = styled.div`
border:1px solid white;
`
