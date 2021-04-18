import React, { useCallback, useContext, useEffect, useState } from "react";
import { createContext, useMemo } from "react";
import { getAllCards, } from ".";
import { Card } from "../types";



const contextProvider = createContext<{ cards:any; error:any; fetchCards:any}|null>(null);

const Provider = contextProvider.Provider;


export const MainContextProvider: React.FC = ({ children }) => {
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

     
    const contextValue = useMemo(() => ({cards,error,fetchCards}), [cards,error,fetchCards]);

    return <Provider value={contextValue}>{children}</Provider>;
};


export const useMainContext=()=>{
   const context =useContext(contextProvider)
   if(context===null){
      throw Error("Context has not been Provided!");
   }
   return context
}
