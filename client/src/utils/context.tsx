import React, { useCallback, useContext, useEffect, useState } from "react";
import { createContext, useMemo } from "react";
import { getAllCards, updateCard, } from ".";
import { Card, CardUpdate, CardUpdateStatus } from "../types";



const contextProvider = createContext<{activeCardIndex:number;increaseActiveCardIndex:()=>void; cards:any; error:any; fetchCards:any; }|null>(null);

const Provider = contextProvider.Provider;


export const MainContextProvider: React.FC = ({ children }) => {
   const [activeCardIndex,setActiveCardIndex]=useState(0)
   
   const [cards,setCards]=useState<Card[]>([])
   const [error,setError]=useState<boolean>(false)

   const fetchCards=useCallback(
      () => {
         getAllCards().then(cards => {
            console.log(cards)
            setCards(cards)
         }).catch(() => setError(true))
      },
      [],
   )

   const increaseActiveCardIndex=useCallback(()=>{
      const increasedIndex = activeCardIndex +1
      setActiveCardIndex(increasedIndex)
   },[activeCardIndex])
console.log(activeCardIndex)
     
    const contextValue = useMemo(() => ({cards,error,fetchCards,activeCardIndex,increaseActiveCardIndex}), [cards,error,fetchCards,activeCardIndex,increaseActiveCardIndex]);

    return <Provider value={contextValue}>{children}</Provider>;
};


export const useMainContext=()=>{
   const context =useContext(contextProvider)
   if(context===null){
      throw Error("Context has not been Provided!");
   }
   return context
}
