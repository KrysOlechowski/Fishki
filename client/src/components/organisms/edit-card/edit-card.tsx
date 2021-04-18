import clsx from 'clsx';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import styled from "styled-components/macro";

import { EditIcon } from '../../../assets/icons'
import { Card, CardUpdate,  } from '../../../types';
import {  useEditCard,  } from '../../../utils';
import { COLLECTIONS_OPTIONS } from '../../../utils/constants';
import { Dropdown } from '../../molecules/dropdown'

interface Props {
   card: Card;
}



export const EditCard: FC<Props> = ({ card }) => {
   const dropdownOptions = COLLECTIONS_OPTIONS

   const { front, back, status, _id: id } = card
   const [isOnEditMode, setIsOnEditMode] = useState(false)
   const [formFront, setFormFront] = useState(front)
   const [formBack, setFormBack] = useState(back)
   const [cardCollection,setCardCollection]=useState(COLLECTIONS_OPTIONS[0].label)

   const {hasError,isLoading,isComplete,editCard}=useEditCard()

   useEffect(() => {
      isComplete&& setIsOnEditMode(false)
   }, [isComplete])

   const onClick = useCallback(
      () => {
         setIsOnEditMode(!isOnEditMode)
      },
      [isOnEditMode],
   )

   const onDropdownSelect=useCallback((value)=>{
      setCardCollection(value)
   },[])

   const onUpdateCard = useCallback(
      () => {
         const updatedFields: CardUpdate = {
            id: id,
            front: formFront,
            back: formBack,
            collectionName:cardCollection
         }
         editCard(updatedFields)
      },
      [id, formFront, formBack,cardCollection,editCard],
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
   }, [hasError,isLoading,isComplete])

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
      <Wrapper className={clsx("wrapper", { editMode: isOnEditMode })}>
         <EditIcon className="iconWrapper" onClick={onClick} />

         <input name="front" value={formFront} onChange={onInputChange}></input>
         <input name="back" value={formBack} onChange={onInputChange}></input>
         <h3>status: {status}</h3>
         <h3>id: {id}</h3>
         <Dropdown onSelection={onDropdownSelect} options={dropdownOptions} />
         <button onClick={onUpdateCard}>{cardUpdateText}</button>
      </Wrapper>
   )
};

const Wrapper = styled.div`

   background-color:#f0c808;
   width:100%;
   height:100%;
   clip-path: circle(30px at 95% 10px);
  transition: clip-path 1s;
  color:black;

&.editMode{
   clip-path: circle(100%);

}

&,.iconWrapper{
   position: absolute;
    top: 0;
    right: 0;
}

&:hover{
   cursor: pointer;
}
`
