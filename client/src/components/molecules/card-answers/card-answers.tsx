import { FC, useCallback, useMemo } from "react";
import styled from "styled-components/macro";

import { Card } from "../../../types";
import { getVisibleAndHiddenText, milisecondsToDate } from "../../../utils";
import { PercentageColumns } from "../percentage-columns";

interface Props {
  card: Card;
  onShowAnswer: () => void;
  showAnswer: boolean;
}

export const CardAnswers: FC<Props> = ({ card, showAnswer, onShowAnswer }) => {
  const { front, back, goodAnswers, badAnswers } = card;
  const cardAnswers = useMemo(() => getVisibleAndHiddenText(front, back), [
    front,
    back,
  ]);
  const isNewCard = goodAnswers === 0 && badAnswers === 0;

  const toggleAnswer = useCallback(() => {
    onShowAnswer();
  }, [onShowAnswer]);
  const currenttime = new Date().getTime();

  const lastTimeAnswer = milisecondsToDate(
    currenttime - card.currentAnswerTime
  );

  const { visibleText, hiddenText } = cardAnswers;

  return (
    <Container onClick={toggleAnswer}>
      <h3>{visibleText}</h3>
      <div className="separate-answer"></div>
      {showAnswer ? <h3>{hiddenText}</h3> : <h3>Show Answer</h3>}

      {showAnswer && !isNewCard && (
        <>
          <PercentageColumns
            firstColumn={goodAnswers}
            secondColumn={badAnswers}
          />
        </>
      )}
      <LastTimeAnswer>
        <span>
          You viewed this card{" "}
          <span className="time-info">{lastTimeAnswer}</span> ago.
        </span>
        <span>
          {card.status !== "new" && (
            <>
              <span>Previous answer was </span>
              <span className="status-info">
                {card.status === "good" ? "good" : "wrong"}
              </span>
            </>
          )}
        </span>
      </LastTimeAnswer>
    </Container>
  );
};

const LastTimeAnswer = styled.div`
  font-size: 12px;
  font-weight: 100;

  .time-info,
  .status-info {
    font-weight: 600;
  }
`;

const Container = styled.div`
  height: 100%;

  .separate-answer {
    border-bottom: 1px solid white;
  }
`;
