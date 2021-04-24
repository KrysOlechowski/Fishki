/* eslint-disable no-mixed-operators */
import clsx from 'clsx';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components/macro";

import { Card, CardUpdate, } from '../../../types';
import { useEditCard, } from '../../../utils';
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

   const { hasError, isLoading, isComplete, editCard } = useEditCard()

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
   return (
      <Wrapper status={status} className={clsx("wrapper", { editMode: isOnEditMode })}>
         <EditButton onClick={onCardFlip} />
         <input name="front" value={formFront} onChange={onInputChange}></input>
         <input name="back" value={formBack} onChange={onInputChange}></input>
         <h3>status: {status}</h3>
         <h3>id: {id}</h3>
         <Dropdown onSelection={onDropdownSelect} options={dropdownOptions} />
         <button onClick={onUpdateCard}>{cardUpdateText}</button>
      </Wrapper>
   )
};

interface WrapperProps {
   status?: string;
}

const Wrapper = styled.div<WrapperProps>`
 
`

