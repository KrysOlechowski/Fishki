import React, { FC, useEffect, useState } from 'react';

import { CreateCard } from '../create-card'
import { getAllCards } from '../../utils';

import { Card } from '../../types'
interface MainProps {
}


export const Main: FC<MainProps> = () => {
   const [cards, setCards] = useState<Array<Card> | null>(null)
   const [hasError, setError] = useState(false)

   useEffect(() => {
      getAllCards().then(cards => {
         setCards(cards)
      }).catch(() => setError(true))
   }, [])

   return (
      <>
         <h1>Cards :</h1>
         {cards && cards.map(card => {
            return <p key={card.title}>{card.title}</p>
         })}

         <CreateCard />
         {hasError && (
            <h1>Error while loading the cards</h1>
         )}
      </>
   )
};
