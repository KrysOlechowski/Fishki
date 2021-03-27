import React, { useEffect, useState } from 'react';



import { Card } from '../../types'
import { getAllCards } from '../../utils';
interface MainProps {
}


export const Main = (props: MainProps) => {
   const [cards, setCards] = useState<Array<Card> | null>(null)
   const [hasError, setError] = useState(false)

   useEffect(() => {
      getAllCards().then(cards => {
         setCards(cards)
         console.log(cards)

      }).catch(() => setError(true))
   }, [])

   return (
      <>
         <h1>Cards :</h1>
         {cards && cards.map(card => {
            return <p>{card.title}</p>
         })}
         {hasError && (
            <h1>Error while loading the cards</h1>
         )}
      </>
   )

};
