import { FC, useCallback, useState } from "react";
import styled from "styled-components/macro";

import { Card } from "../../../types";
import { useMainContext } from "../../../utils";
import { CardAnswers } from "../card-answers";
import { TestModeCard } from "../test-mode-card";

interface Props {
  card: Card;
}

export const CardFrontInner: FC<Props> = ({ card }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const { isTestMode } = useMainContext();

  const onShowAnswer = useCallback(() => {
    setShowAnswer(true);
  }, [setShowAnswer]);

  return (
    <Container>
      <Inner onClick={onShowAnswer}>
        {isTestMode ? (
          <TestModeCard card={card}></TestModeCard>
        ) : (
          <CardAnswers
            card={card}
            onShowAnswer={onShowAnswer}
            showAnswer={showAnswer}
          />
        )}
      </Inner>
      <div className="separate-line"></div>
    </Container>
  );
};

const Inner = styled.div`
  height: 100%;
  padding: 20px;

  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 275px;
  background: linear-gradient(#f7f8fa, #c8c8c7);
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;

  .separate-line {
    box-shadow: 0px -2px 10px 1px #3f3f3f;
  }
`;
