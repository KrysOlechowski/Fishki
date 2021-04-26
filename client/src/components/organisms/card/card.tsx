import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import clsx from 'clsx'
import '../../../theme/variables.scss'


import { Card as CardInterface, CardStatus } from '../../../types';

import { EditCard } from '../edit-card'
import { CardAnswers } from '../../molecules/card-answers'
import { EditButton } from '../../molecules/edit-button';
import { CardFrontInner } from '../../molecules/card-front-inner'
interface Props {
   card: CardInterface;
}


export const CardComponent: FC<Props> = ({ card }) => {
   const [flipCard, setFlipCard] = useState(false)

   const cardStatusClassName = useMemo(() => {
      if (card.status === CardStatus.good) {
         return CardStatus.good
      } else if (card.status === CardStatus.bad) {
         return CardStatus.bad
      } else {
         return CardStatus.new
      }
   }, [card.status])

   const onCardFlip = useCallback(
      () => {
         setFlipCard(!flipCard)
      },
      [flipCard],
   )

   return (
      <CardWrapper size="16">
         <Card className={clsx({ flipped: flipCard })} >
            <div className={clsx("cardFace front", cardStatusClassName)}>
               <EditButton onClick={onCardFlip} />

               <CardFrontInner card={card} />

               <CardAnswers card={card} />
            </div>
            <div className="cardFace back">
               <EditCard card={card} onCardFlip={onCardFlip} />
            </div>
         </Card>
      </CardWrapper >
   )
};

interface CardWrapperProps {
   size: string;
}
const CardWrapper = styled.div<CardWrapperProps>`
      border-radius: 20px;
      overflow: hidden;
      width: 250px;
      height: 350px;
      margin: 15px;
      perspective: 600px;
      font-size:${props => props.size}px;
   `


const Card = styled.div`
   position: relative;
   width: 100%;
   height: 100%;
   transform-style: preserve-3d;
   transform-origin: center right;
   transition: transform 1s;

  .cardFace{
      position: absolute;
      width: 100%;
      height: 100%;
      color: #454545;;
      text-align: center; 
      font-weight: bold;
      backface-visibility: hidden;
      box-shadow: 2px 3px 15px -5px #000000;
       border-radius:20px;

      &.front{
         background-color:white;

         &.new{
         /* background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%); */
         }

         &.good{
            /* background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%); */
         }

         &.bad{
            /* background-image: linear-gradient(to top, #ff758c 0%, #ff7eb3 100%); */
         }

         &.deleted{
            background-color:#a63d40;
            }
         }

      &.back{
         background-color:red;
           transform: rotateY(180deg);
      }
  }

  &.flipped {
      transform: translateX(-100%) rotateY(-180deg);
   }
`
