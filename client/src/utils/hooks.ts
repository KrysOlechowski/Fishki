import { useCallback, useEffect, useState } from "react";
import { getAllCards, updateCard } from "../utils/api";
import { Card, CardUpdate } from "../types";
import { useMainContext } from "./context";

export const useGetAllCards = () => {
  const [cards, setCards] = useState<Array<Card> | null>(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      setError(false);
      getAllCards()
        .then(setCards)
        .catch(() => setError(true))
        .finally(() => setIsLoading(false));
    }
  }, [isLoading, cards]);

  return { cards, hasError, isLoading };
};

export const useEditCard = ()=>{
  const [hasError,setError]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [isComplete,setIsComplete]=useState(false)
  const {fetchCards}=useMainContext()

useEffect(() => {
  setIsComplete(false)
}, [isLoading])

  const editCard=useCallback(
    (updatedFields:CardUpdate) => {
      setIsLoading(true)
       updateCard(updatedFields).then(res => {
          if (res.ok) {
            setIsComplete(true)
            setIsLoading(false)
             fetchCards()
          }
       }).catch((err) => {
        setError(true)
        setIsLoading(false)
          console.log(err)
       })
    },
    [fetchCards],
 )




  return {hasError,isLoading,isComplete,editCard}
}
