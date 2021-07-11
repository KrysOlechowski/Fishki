import React, { useCallback, useContext, useState } from "react";
import { createContext, useMemo } from "react";
import { getAllCards } from ".";
import { Card, Context, ContextLessonMode } from "../types";
import { checkSessionInMongo } from "../utils";

const contextProvider = createContext<Context | null>(null);

const Provider = contextProvider.Provider;

const { read_cookie } = require("sfcookies");

export const MainContextProvider: React.FC = ({ children }) => {
  const [lessonMode, setLessonMode] = useState<ContextLessonMode>({
    goodAnswers: 0,
    badAnswers: 0,
    numberOfCards: 0,
  });
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cards, setCards] = useState<Card[]>([]);

  const [error, setError] = useState<boolean>(false);
  const [isTestMode, setIsTestMode] = useState(true);
  const [isLessonMode, setIsLessonMode] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchCards = useCallback(() => {
    getAllCards()
      .then((cards) => {
        console.log(cards);
        setCards(cards);
      })
      .catch(() => setError(true));
  }, []);

  const checkSession = useCallback(() => {
    const cookie = read_cookie("fishki");
    console.log("SESSION:");
    console.log(cookie);
    if (cookie) {
      checkSessionInMongo(cookie).then((res) => {
        console.log(res);
        if (res.cookieExist) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
    }
  }, []);

  const increaseActiveCardIndex = useCallback(() => {
    const increasedIndex = activeCardIndex + 1;
    setActiveCardIndex(increasedIndex);
  }, [activeCardIndex]);

  const contextValue = useMemo(
    () => ({
      cards,
      error,
      fetchCards,
      activeCardIndex,
      increaseActiveCardIndex,
      lessonMode,
      setLessonMode,
      isTestMode,
      setIsTestMode,
      isLessonMode,
      setIsLessonMode,
      isLoggedIn,
      setIsLoggedIn,
      checkSession,
    }),
    [
      cards,
      error,
      fetchCards,
      activeCardIndex,
      increaseActiveCardIndex,
      lessonMode,
      setLessonMode,
      isTestMode,
      setIsTestMode,
      isLessonMode,
      setIsLessonMode,
      isLoggedIn,
      setIsLoggedIn,
      checkSession,
    ]
  );

  return <Provider value={contextValue}>{children}</Provider>;
};

export const useMainContext = () => {
  const context = useContext(contextProvider);
  if (context === null) {
    throw Error("Context has not been Provided!");
  }
  return context;
};
