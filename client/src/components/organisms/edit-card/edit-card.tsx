import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";

import { EditIcon } from '../../../assets/icons'
import { Card, CardUpdate, CardUpdateStatus, CardStatus } from '../../../types';
import { updateCard, useMainContext } from '../../../utils';
import { COLLECTIONS_OPTIONS } from '../../../utils/constants';
import { Dropdown } from '../../molecules/dropdown'

interface Props {
   card: Card;
}



export const EditCard: FC<Props> = ({ card }) => {
   const { front, back, status, _id: id } = card
   const [isOnEditMode, setIsOnEditMode] = useState(false)
   const [cardUpdateStatus, setCardUpdateStatus] = useState(CardUpdateStatus.NONE)
   const [formFront, setFormFront] = useState(front)
   const [formBack, setFormBack] = useState(back)
   const [cardCollection,setCardCollection]=useState("")
   const dropdownOptions = COLLECTIONS_OPTIONS

   const {fetchCards}=useMainContext()


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
         setCardUpdateStatus(CardUpdateStatus.PENDING)
         const updatedFields: CardUpdate = {
            id: id,
            front: formFront,
            back: formBack,
            status: CardStatus.good,
            collectionName:cardCollection
         }
         updateCard(updatedFields).then(res => {
            if (res.ok) {
               setCardUpdateStatus(CardUpdateStatus.UPDATED)
               fetchCards()
            }
         }).catch((err) => {
            console.log(err)
            setCardUpdateStatus(CardUpdateStatus.FAILED)
         })
      },
      [id, formFront, formBack,cardCollection,fetchCards],
   )


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
