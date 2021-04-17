import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";
import clsx from 'clsx'
import '../../../theme/variables.scss'


import { Card, CardDeleteStatus } from '../../../types';
import { deleteCard } from '../../../utils';

import { EditCard } from '../edit-card'
import { CardAnswers } from '../../molecules/card-answers'
interface Props {
   card: Card;
}


export const CardComponent: FC<Props> = ({ card }) => {
   const { front, back, status, collectionName,_id: id } = card

   const [cardDeleteStatus, setCardDeletestatus] = useState(CardDeleteStatus.NONE)

   const onDeleteCard = useCallback(
      () => {
         setCardDeletestatus(CardDeleteStatus.PENDING)
         const cardId = id
         deleteCard(cardId).then((res) => {
            console.log("card deleted + res: ")
            console.log(res)
            setCardDeletestatus(CardDeleteStatus.DELETED)
         }).catch((err) => {
            console.log(err)
            setCardDeletestatus(CardDeleteStatus.FAILED)

         })
      },
      [id],
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



   return (
      <CardWrapper className={clsx("test2", { deleted: cardDeleteStatus === CardDeleteStatus.DELETED })} size="14">
         <EditCard card={card} />
         <h3>front: {front}</h3>
         <h3>back: {back}</h3>
         <h3>status: {status}</h3>
         <h3>collection: {collectionName}</h3>
         <h3>id: {id}</h3>
         <button onClick={onDeleteCard}>{cardStatusText}</button>
         <CardAnswers card={card} />
      </CardWrapper >
   )
};

interface CardWrapperProps {
   className: string;
   size: string;
}
const CardWrapper = styled.div<CardWrapperProps>`
position:relative;
border:1px solid white;
background-color:var(--mine-shaft);
color:white;

&.deleted{
   background-color:#a63d40;
}
${({ size }) =>
      size === "combined" &&
      `
    background-color:green;
  `}
width:300px;
height:400px;
font-size:${props => props.size}px;
`
