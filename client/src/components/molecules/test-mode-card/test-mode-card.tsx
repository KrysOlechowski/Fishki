import { FC } from "react";
import styled from "styled-components";

import { Card } from "../../../types";

interface Props {
  card: Card;
}
export const TestModeCard: FC<Props> = ({ card }) => {
  const {
    status,
    collectionName,
    _id: id,
    goodAnswers,
    badAnswers,
    front,
    back,
    lastAnswerTime,
    currentAnswerTime,
    timeBetweenAnswers,
  } = card;
  return (
    <TestModeWrapper>
      <h4>front: {front}</h4>
      <h4>back: {back}</h4>
      <h4>lastAnswerTime: {lastAnswerTime}</h4>
      <h4>currentAnswerTime: {currentAnswerTime}</h4>
      <h4>timeBetweenAnswers: {timeBetweenAnswers}</h4>
      <h4>prev answer: {status}</h4>
      <h4>collection: {collectionName}</h4>
      <h4>Good: {goodAnswers}</h4>
      <h4>Bad: {badAnswers}</h4>
      <h4>id: {id}</h4>
    </TestModeWrapper>
  );
};

const TestModeWrapper = styled.div`
  text-align: left;
  h4 {
    margin: 5px;
  }
`;
