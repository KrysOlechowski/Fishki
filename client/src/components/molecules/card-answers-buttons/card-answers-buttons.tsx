import { FC, useCallback } from "react";

import clsx from "clsx";
import styled from "styled-components/macro";

import { Card, CardStatus } from "../../../types";
import { useEditCard, useMainContext } from "../../../utils";
import { Button } from "../../atoms/button";

interface Props {
  card: Card;
}

export const CardAnswersButtons: FC<Props> = ({ card }) => {
  const { editAnswer } = useEditCard();
  const { lessonMode, setLessonMode } = useMainContext();
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      const answer = e.target.name;
      const { goodAnswers, badAnswers, lastAnswerTime } = card;
      const lesson = lessonMode;
      if (answer === "good") {
        const increasedAnswer = lessonMode.goodAnswers + 1;
        setLessonMode({ ...lesson, goodAnswers: increasedAnswer });
        editAnswer({
          id: card._id,
          goodAnswers: goodAnswers + 1,
          status: CardStatus.good,
          lastAnswerTime: lastAnswerTime,
        });
      } else {
        const increasedAnswer = lessonMode.badAnswers + 1;
        setLessonMode({ ...lesson, badAnswers: increasedAnswer });
        editAnswer({
          id: card._id,
          badAnswers: badAnswers + 1,
          status: CardStatus.bad,
          lastAnswerTime: lastAnswerTime,
        });
      }
    },
    [card, lessonMode, setLessonMode, editAnswer]
  );

  return (
    <Wrapper className={clsx("wrapper")}>
      <Button className="card-answer-button" onClick={handleClick} name="good">
        Good
      </Button>
      <Button className="card-answer-button" onClick={handleClick} name="bad">
        Bad
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 13px;
  display: flex;

  .card-answer-button {
    margin: 10px;
  }
`;
