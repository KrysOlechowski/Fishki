import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components'
import { CreateCardStatus } from '../../atoms/create-card-status';
import { CardCreateStatus, CardStatus } from '../../../types';

import { createCard } from '../../../utils/api'
import { COLLECTIONS_OPTIONS } from '../../../utils/constants';
import {Dropdown}from '../../molecules/dropdown'

import '../../../theme/variables.scss'

interface Props {
}



export const CreateCard: FC<Props> = () => {
   const [cardFront, setCardFront] = useState("")
   const [cardBack, setCardBack] = useState("")
   const [emptyFieldError, setEmptyFieldError] = useState(false)
   const [cardCreateStatus, setCardCreateStatus] = useState(CardCreateStatus.NEW)
   const [cardCollection,setCardCollection]=useState("")

   const dropdownOptions = COLLECTIONS_OPTIONS

   const onSubmit: any = useCallback(
      (e: any) => {
         e.preventDefault()
         if (!cardFront || !cardBack || !cardCollection) {
            setEmptyFieldError(true)
         } else {
            setEmptyFieldError(false)
            const payload = {
               front: cardFront,
               back: cardBack,
               status: CardStatus.new,
               collectionName: cardCollection
            }
            setCardCreateStatus(CardCreateStatus.PENDING)
            createCard(payload).then(() => {
               setCardCreateStatus(CardCreateStatus.CREATED)
               setCardFront("")
               setCardBack("")

            }).catch((err) => {
               setCardCreateStatus(CardCreateStatus.FAILED)
               console.log(err)
            })
         }
      },
      [cardFront, cardBack,cardCollection]
   )

   const onChange = useCallback(
      (e: any) => {
         const name = e.target.name
         const value = e.target.value
         if (name === "front") {
            setCardFront(value)
         } else   {
            setCardBack(value)
         } 
      },
      [],
   )

   const onDropdownSelect=useCallback((value)=>{
      setCardCollection(value)
   },[])

   return (
      <>

         <CreateCardWrapper>
            <h1>Create card</h1>
            <form action="submit" onSubmit={onSubmit} autoComplete="off">

               <div className="">
                  <input type="text" placeholder="Front" onChange={onChange} value={cardFront} name="front" />
               </div>
               <div className="">
                  <input type="text" placeholder="Back" onChange={onChange} value={cardBack} name="back" />
               </div>
               <div className="">
                  <Dropdown onSelection={onDropdownSelect} options={dropdownOptions}/>
               </div>

               <div className="">
                  <button type="submit">Submit</button>
               </div>
               <CreateCardStatus status={cardCreateStatus} />
               {emptyFieldError && (
                  <div className="">
                     <p>You need to fill all the required forms</p>
                  </div>
               )}
            </form>
         </CreateCardWrapper>
      </>
   )
};

const CreateCardWrapper = styled.div`
width:350px;
padding:50px;
border:1px solid white;
background-color:var(--mine-shaft);
color:white;
`
