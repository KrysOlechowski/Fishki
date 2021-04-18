/* eslint-disable react-hooks/exhaustive-deps */
import { FC,  useEffect,  } from 'react';
import styled from "styled-components/macro"

import { CreateCard } from '../../organisms/create-card'
import { CreateCollection } from '../../organisms/create-collection'

import { Card } from '../../../types'
import { CardComponent } from '../../organisms/card'
import {useMainContext}from '../../../utils'

import '../../../theme/variables.scss'
interface MainProps {
}


export const Main: FC<MainProps> = () => {
   const {cards,error,fetchCards}=useMainContext()
   
   useEffect(() => {
      fetchCards()
   }, [])

 

   return (
      <MainWrapper>
         <MenuWrapper>
            <CreateCard />
         </MenuWrapper>
         <CardsWrapper>
            {cards && cards.map((card: Card) => {
               return <CardComponent card={card} key={card._id} />
            })}
         </CardsWrapper>
         {error && (
            <h1>Error while loading the cards</h1>
         )}
         <CreateCollection />
      </MainWrapper>
   )
};

const MainWrapper = styled.div`
display:flex;
flex-direction:column;
background-color:var(--tundora);
`

const MenuWrapper = styled.div`

`

const CardsWrapper = styled.div`
display:flex;

`
