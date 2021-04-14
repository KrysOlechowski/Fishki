import clsx from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import styled from "styled-components/macro";

import { EditIcon } from '../../assets/icons'
import { Card, CardUpdateStatus } from '../../types';
import { updateCard } from '../../utils';
import { Dropdown } from '../../molecules/dropdown'

interface Props {
   card: Card;
}



export const EditCard: FC<Props> = ({ card }) => {
   const { title, front, back, status, _id: id } = card
   const [isOnEditMode, setIsOnEditMode] = useState(false)
   const [cardUpdateStatus, setCardUpdateStatus] = useState(CardUpdateStatus.NONE)
   const [formFront, setFormFront] = useState(front)
   const [formBack, setFormBack] = useState(back)
   const dropdownOptions = [
      { label: "angielski" }, { label: "test" }
   ]

   const onClick = useCallback(
      () => {
         setIsOnEditMode(!isOnEditMode)
      },
      [isOnEditMode],
   )

   const onUpdateCard = useCallback(
      () => {
         setCardUpdateStatus(CardUpdateStatus.PENDING)
         const updatedFields = {
            id: id,
            title: "rrr title",
            front: formFront,
            back: formBack,
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
      [id, formFront, formBack],
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
         <h2>title: {title}</h2>

         <input name="front" value={formFront} onChange={onInputChange}></input>
         <input name="back" value={formBack} onChange={onInputChange}></input>
         <h3>status: {status}</h3>
         <h3>id: {id}</h3>
         <Dropdown options={dropdownOptions} />
         <button onClick={onUpdateCard}>{cardUpdateText}</button>
      </Wrapper>
   )
};

const Wrapper = styled.div`

   background-color:pink;
   width:100%;
   height:100%;
   clip-path: circle(30px at 95% 10px);
  transition: clip-path 1s;

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
