/* eslint-disable no-mixed-operators */
import clsx from 'clsx';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components/macro";

import { Card, CardDeleteStatus, CardUpdate, } from '../../../types';
import { deleteCard, useEditCard, useMainContext, } from '../../../utils';
import { COLLECTIONS_OPTIONS } from '../../../utils/constants';
import { Dropdown } from '../../molecules/dropdown'
import { EditButton } from '../../molecules/edit-button';

interface Props {
   card: Card;
   onCardFlip: () => void;
}



export const EditCard: FC<Props> = ({ card, onCardFlip }) => {
   const dropdownOptions = COLLECTIONS_OPTIONS

   const { front, back, status, _id: id } = card
   const [isOnEditMode, setIsOnEditMode] = useState(false)
   const [formFront, setFormFront] = useState(front)
   const [formBack, setFormBack] = useState(back)
   const [cardCollection, setCardCollection] = useState(COLLECTIONS_OPTIONS[0].label)
   const [cardDeleteStatus, setCardDeletestatus] = useState(CardDeleteStatus.NONE)

   const { hasError, isLoading, isComplete, editCard } = useEditCard()
   const { fetchCards } = useMainContext()
   useEffect(() => {
      isComplete && setIsOnEditMode(false)
   }, [isComplete])

   const onDropdownSelect = useCallback((value) => {
      setCardCollection(value)
   }, [])

   const onUpdateCard = useCallback(
      () => {
         const updatedFields: CardUpdate = {
            id: id,
            front: formFront,
            back: formBack,
            collectionName: cardCollection
         }
         editCard(updatedFields)
      },
      [id, formFront, formBack, cardCollection, editCard],
   )


   const cardUpdateText = useMemo(() => {
      if (isComplete) {
         return "Card Updated"
      }
      else if (isLoading) {
         return "Updating Card"
      } else if (hasError) {
         return "Updating Card Failed"
      } else if (!isLoading) {
         return "Update Card"
      } else {
         return ""
      }
   }, [hasError, isLoading, isComplete])

   const onInputChange = useCallback(
      (e) => {
         const { name, value } = e.target
         if (name === "front") {
            setFormFront(value)
         } else {
            setFormBack(value)
         }
      },
      [],
   )
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

   return (
      <Wrapper status={status} className={clsx("wrapper", { editMode: isOnEditMode }, { deleted: cardDeleteStatus === CardDeleteStatus.DELETED })}>
         <EditButton onClick={onCardFlip} />
         <input name="front" value={formFront} onChange={onInputChange}></input>
         <input name="back" value={formBack} onChange={onInputChange}></input>
         <h3>status: {status}</h3>
         <h3>id: {id}</h3>
         <Dropdown onSelection={onDropdownSelect} options={dropdownOptions} />
         <button onClick={onUpdateCard}>{cardUpdateText}</button>
         <button onClick={onDeleteCard}>{cardStatusText}</button>
      </Wrapper>
   )
};

interface WrapperProps {
   status?: string;
}

const Wrapper = styled.div<WrapperProps>`
 
`

