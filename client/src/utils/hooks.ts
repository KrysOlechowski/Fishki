import { useEffect, useState } from "react";
import { getAllCards } from "../utils/api";
import { Card } from "../types";

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
