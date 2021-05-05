import clsx from 'clsx';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components/macro";

import { Card, CardDeleteStatus, CardUpdate, } from '../../../types';
import { deleteCard, useEditCard, useMainContext, } from '../../../utils';
import { COLLECTIONS_OPTIONS } from '../../../utils/constants';
import { Dropdown } from '../../molecules/dropdown'
import { EditButton } from '../../molecules/edit-button';
import { Button } from '../../atoms/button'


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
         return "Updating..."
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
      <Container status={status} className={clsx("wrapper", { editMode: isOnEditMode }, { deleted: cardDeleteStatus === CardDeleteStatus.DELETED })}>

         <CardBackInner>
            <EditButton onClick={onCardFlip} />
            <div>Front:</div>
            <Input name="front" value={formFront} onChange={onInputChange} autoComplete="off"></Input>
            <div>Back:</div>
            <Input name="back" value={formBack} onChange={onInputChange} autoComplete="off"></Input>
            <div>Collection:</div>
            <Dropdown onSelection={onDropdownSelect} options={dropdownOptions} />
         </CardBackInner>
         <ButtonsWrapper>
            <Button className="edit-card-button" onClick={onUpdateCard}>{cardUpdateText}</Button>
            <Button className="edit-card-button" bgColor="#F48A94" onClick={onDeleteCard}>{cardStatusText}</Button>
         </ButtonsWrapper>

      </Container>
   )
};

interface WrapperProps {
   status?: string;
}

const Container = styled.div<WrapperProps>`
 display:flex;
 flex-direction:column;

`
const CardBackInner = styled.div`
   height:  275px;
   background: linear-gradient(#F7F8FA, #C8C8C7);
   padding:20px;
   border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`

const Input = styled.input`
   padding: 5px;
    border-radius: 10px;
    border-color: #3f3f3f;
    margin: 5px 0;
    outline: none;
`

const ButtonsWrapper = styled.div`
   margin-top:13px;
   background-color:white;
   display:flex;

   .edit-card-button{
      margin:10px;
   }
`
