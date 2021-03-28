import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components'
import clsx from 'clsx'


import { Card, CardDeleteStatus } from '../../types';
import { deleteCard } from '../../utils';

interface Props {
   card: Card;
}


export const CardComponent: FC<Props> = ({ card }) => {
   const { title, front, back, _id: id } = card

   const [cardDeleteStatus, setCardDeletestatus] = useState(CardDeleteStatus.NONE)

   const onDelete = useCallback(
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
      if (cardDeleteStatus === CardDeleteStatus.PENDING) {
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
         <h2>{title}</h2>
         <h3>{front}</h3>
         <h3>{back}</h3>
         <h3>{id}</h3>
         <button onClick={onDelete}>Delete Card</button>
         <h3>{cardStatusText}</h3>
      </CardWrapper >
   )
};

interface CardWrapperProps {
   className: string;
   size: string;
}
const CardWrapper = styled.div<CardWrapperProps>`

 &.test2{
   border:1px solid green;
}

&.deleted{
   background-color:pink;
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
