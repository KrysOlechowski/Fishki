import React, { useCallback, useContext, useState } from "react";
import { createContext, useMemo } from "react";
import { getAllCards, } from ".";
import { Card } from "../types";



const contextProvider = createContext<{ activeCardIndex: number; increaseActiveCardIndex: () => void; cards: Card[]; error: boolean; fetchCards: () => void; lessonMode: any; setLessonMode: any } | null>(null);

const Provider = contextProvider.Provider;

interface LessonMode {
   goodAnswers: number;
   badAnswers: number;
}

export const MainContextProvider: React.FC = ({ children }) => {
   const [lessonMode, setLessonMode] = useState<LessonMode>({
      goodAnswers: 0,
      badAnswers: 0
   })
   const [activeCardIndex, setActiveCardIndex] = useState(0)

   const [cards, setCards] = useState<Card[]>([])
   const [error, setError] = useState<boolean>(false)

   const fetchCards = useCallback(
      () => {
         getAllCards().then(cards => {
            console.log(cards)
            setCards(cards)
         }).catch(() => setError(true))
      },
      [],
   )

   const increaseActiveCardIndex = useCallback(() => {
      const increasedIndex = activeCardIndex + 1
      setActiveCardIndex(increasedIndex)
   }, [activeCardIndex])

   const contextValue = useMemo(() => ({ cards, error, fetchCards, activeCardIndex, increaseActiveCardIndex, lessonMode, setLessonMode }), [cards, error, fetchCards, activeCardIndex, increaseActiveCardIndex, lessonMode, setLessonMode]);

   return <Provider value={contextValue}>{children}</Provider>;
};


export const useMainContext = () => {
   const context = useContext(contextProvider)
   if (context === null) {
      throw Error("Context has not been Provided!");
   }
   return context
}
