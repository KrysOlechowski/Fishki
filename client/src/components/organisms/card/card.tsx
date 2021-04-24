import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import clsx from 'clsx'
import '../../../theme/variables.scss'


import { Card as CardInterface, CardDeleteStatus, CardStatus } from '../../../types';
import { deleteCard, useMainContext } from '../../../utils';

import { EditCard } from '../edit-card'
import { CardAnswers } from '../../molecules/card-answers'
import { EditButton } from '../../molecules/edit-button';
interface Props {
   card: CardInterface;
}


export const CardComponent: FC<Props> = ({ card }) => {

   const { front, back, status, collectionName, _id: id, goodAnswers, badAnswers } = card
   const [cardDeleteStatus, setCardDeletestatus] = useState(CardDeleteStatus.NONE)
   const [flipCard, setFlipCard] = useState(false)

   const { fetchCards, isTestMode } = useMainContext()

   const onDeleteCard = useCallback(
      () => {
         setCardDeletestatus(CardDeleteStatus.PENDING)
         const cardId = id
         deleteCard(cardId).then((res) => {
            console.log("card deleted:" + res)
            setCardDeletestatus(CardDeleteStatus.DELETED)
            fetchCards()
         }).catch((err) => {
            console.log(err)
            setCardDeletestatus(CardDeleteStatus.FAILED)

         })
      },
      [id, fetchCards],
   )


   const cardStatusText = useMemo(() => {
      if (cardDeleteStatus === CardDeleteStatus.NONE) {
         return "Delete Card"
      }
      else if (cardDeleteStatus === CardDeleteStatus.PENDING) {
         return "Removing...."
      } else if (cardDeleteStatus === CardDeleteStatus.FAILED) {
         return "Failed removing card"
      } else if (cardDeleteStatus === CardDeleteStatus.DELETED) {
         return "Card deleted"
      } else {
         return ""
      }
   }, [cardDeleteStatus])

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
      <CardWrapper className={clsx({ deleted: cardDeleteStatus === CardDeleteStatus.DELETED })} size="20">
         <Card className={clsx({ flipped: flipCard })} >
            <div className={clsx("cardFace front", cardStatusClassName)}>
               <EditButton onClick={onCardFlip} />
               <h3>front: {front}</h3>
               <h3>back: {back}</h3>
               {isTestMode && (
                  <>
                     <h3>status: {status}</h3>
                     <h3>collection: {collectionName}</h3>
                     <h3>Good: {goodAnswers}</h3>
                     <h3>Bad: {badAnswers}</h3>
                     <h3>id: {id}</h3>
                     <button onClick={onDeleteCard}>{cardStatusText}</button>
                  </>
               )}
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
   className: string;
   size: string;
}
const CardWrapper = styled.div<CardWrapperProps>`
      border-radius: 7px;
      overflow: hidden;
      width: 250px;
      height: 350px;
      border: 1px solid #CCC;
      margin: 15px;
      perspective: 600px;
      box-shadow: 2px 3px 15px -5px #000000;
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
      color: white;
      text-align: center;
      font-weight: bold;
      backface-visibility: hidden;

      &.front{
         &.new{
         background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
         }

         &.good{
            background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
         }

         &.bad{
            background-image: linear-gradient(to top, #ff758c 0%, #ff7eb3 100%);
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
