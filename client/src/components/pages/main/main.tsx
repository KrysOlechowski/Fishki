/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useCallback, useEffect, useState } from "react";
import styled from "styled-components/macro";

import { CreateCard } from "../../organisms/create-card";
import { CreateCollection } from "../../organisms/create-collection";

import { Card } from "../../../types";
import { CardComponent } from "../../organisms/card";
import { Statistics } from "../../organisms/statistics";
import { Lesson } from "../../organisms/lesson";
import { Button } from "../../atoms/button";
import { LoginStatus } from "../../molecules/login-status";
import { LoginForm } from "../../molecules/login-form";

import { useMainContext } from "../../../utils";
import { logout } from "../../../utils";

import "../../../theme/variables.scss";
interface MainProps {}

export const Main: FC<MainProps> = () => {
  const [showAllCards, setShowAllCards] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);
  const { cards, fetchCards, isLoggedIn, checkSession } = useMainContext();
  const {
    isTestMode,
    setIsTestMode,
    isLessonMode,
    setIsLessonMode,
  } = useMainContext();

  useEffect(() => {
    checkSession();
    fetchCards();
  }, []);

  const toggleTestMode = useCallback(
    (_e) => {
      const testMode = isTestMode;
      setIsTestMode(!testMode);
    },
    [isTestMode, setIsTestMode]
  );

  const startLesson = useCallback(() => {
    setIsLessonMode(true);
  }, []);

  const showCards = useCallback(() => {
    setShowAllCards(true);
  }, []);

  const showCreateCardComponenent = useCallback(() => {
    setShowCreateCard(true);
  }, []);

  const showCreateCollectionComponent = useCallback(() => {
    setShowCreateCollection(true);
  }, []);
  const showStatisticsComponent = useCallback(() => {
    setShowStatistics(true);
  }, []);

  const onLogoutClick = useCallback(() => {
    logout().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <MainWrapper>
      <LoginStatus />
      {!isLoggedIn && <LoginForm />}
      {true && (
        <Button onClick={onLogoutClick} className="test-button">
          Logout
        </Button>
      )}
      <Button onClick={toggleTestMode} className="test-button">
        Test Mode
      </Button>
      {isLessonMode && <Lesson />}

      <Button onClick={startLesson} className="start-lesson-button">
        Start Lesson
      </Button>
      <Button onClick={showCards} className="show-cards-button">
        Show All Cards
      </Button>
      <Button
        onClick={showCreateCardComponenent}
        className="create-card-button"
      >
        Create New Card
      </Button>
      <Button
        onClick={showCreateCollectionComponent}
        className="create-collection-button"
      >
        Create New Collection
      </Button>
      <Button
        onClick={showStatisticsComponent}
        className="show-statistics-button"
      >
        Create New Collection
      </Button>

      {showAllCards && (
        <CardsWrapper>
          {cards &&
            cards.map((card: Card) => {
              return <CardComponent card={card} key={card._id} />;
            })}
        </CardsWrapper>
      )}

      {showCreateCard && (
        <MenuWrapper>
          <CreateCard />
        </MenuWrapper>
      )}

      {showCreateCollection && <CreateCollection />}
      {showStatistics && <Statistics />}
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--tundora);
  background-color: #2a363b;
  background: linear-gradient(#d9d8df, #a19eae);

  .test-button {
    max-width: 100px;
  }
  .start-lesson-button {
    max-width: 200px;
  }
  .show-cards-button {
    max-width: 200px;
  }

  .create-card-button {
    max-width: 200px;
  }
  .create-collection-button {
    max-width: 200px;
  }
  .show-statistics-button {
    max-width: 200px;
  }
`;

const MenuWrapper = styled.div``;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
