import { FC} from 'react';
import styled from "styled-components/macro";

import { getAnswersColumnsChart } from '../../../utils';

import '../../../theme/variables.scss'

interface Props {
 firstColumn:number;
 secondColumn:number;
}


export const PercentageColumns: FC<Props> = ({ firstColumn, secondColumn }) => {

   const percentageColumns = getAnswersColumnsChart(firstColumn, secondColumn)

   return (
      <Container >
       <div className="inner-wrapper">
          <div className="row-wrapper good">
             <Column value={percentageColumns.firstColumn} bgColor="#3DC99C"/>
            <div className="text">{percentageColumns.goodAnswers}</div>
          </div>
         <div className="row-wrapper bad">
          <Column value={percentageColumns.secondColumn} bgColor="#F48A94"/>
          <div className="text">{percentageColumns.badAnswers}</div>
             </div>
       </div>
      </Container>
   )
};

interface ColumnProps {
   value: number;
   bgColor:string;
}

const Column=styled.div<ColumnProps>`
   background-color:${props => props.bgColor};
   width:${props => props.value+1}%;
   height:5px;
`

const Container = styled.div`
   width:100%;
   height:50px;
   display:flex;
   align-items:center;
   flex-direction:column;

   .text{
      margin-left:5px;
      font-size:10px;
   }

   .good{
      color:var(--primaryGreen);
      border-left: 1px solid var(--primaryGreen);
   }

   .bad{
      color:#F48A94;
      border-left: 1px solid var(--primaryRed);
   }

   .inner-wrapper{
      width:100px;
      height:50px;
   }
   .row-wrapper{
      display:flex;
      align-items:center;
      border-width:2px;
      height:8px;
   }


`


