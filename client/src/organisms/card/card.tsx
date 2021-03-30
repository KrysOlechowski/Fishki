import React, { FC, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components'
import clsx from 'clsx'


import { Card, CardDeleteStatus, CardUpdateStatus } from '../../types';
import { deleteCard, updateCard } from '../../utils';

interface Props {
   card: Card;
}


export const CardComponent: FC<Props> = ({ card }) => {
   const { title, front, back, status, _id: id } = card

   const [cardDeleteStatus, setCardDeletestatus] = useState(CardDeleteStatus.NONE)
   const [cardUpdateStatus, setCardUpdateStatus] = useState(CardUpdateStatus.NONE)

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

   const onUpdateCard = useCallback(
      () => {
         setCardUpdateStatus(CardUpdateStatus.PENDING)
         const updatedFields = {
            id: id,
            title: "rrr title",
            front: "updated front",
            back: "updated back",
            status: "updated status"
         }
         updateCard(updatedFields).then(res => {
            if (res.ok) {
               setCardUpdateStatus(CardUpdateStatus.UPDATED)
            }
         }).catch((err) => {
            console.log(err)
            setCardUpdateStatus(CardUpdateStatus.FAILED)
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

   const cardUpdateText = useMemo(() => {
      if (cardUpdateStatus === CardUpdateStatus.NONE) {
         return "Update Card"
      }
      else if (cardUpdateStatus === CardUpdateStatus.PENDING) {
         return "Updating Card"
      } else if (cardUpdateStatus === CardUpdateStatus.FAILED) {
         return "Updating Card Failed"
      } else if (cardUpdateStatus === CardUpdateStatus.UPDATED) {
         return "Card Updated"
      } else {
         return ""
      }
   }, [cardUpdateStatus])


   return (
      <CardWrapper className={clsx("test2", { deleted: cardDeleteStatus === CardDeleteStatus.DELETED })} size="14">
         <h2>title: {title}</h2>
         <h3>front: {front}</h3>
         <h3>back: {back}</h3>
         <h3>status: {status}</h3>
         <h3>id: {id}</h3>
         <button onClick={onDeleteCard}>{cardStatusText}</button>
         <button onClick={onUpdateCard}>{cardUpdateText}</button>
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
