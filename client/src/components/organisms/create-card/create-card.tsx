import React, { FC, useCallback, useState } from "react";
import styled from "styled-components";

import { CreateCardStatus } from "../../atoms/create-card-status";
import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";
import { CardCreateStatus, CardStatus } from "../../../types";

import { createCard } from "../../../utils/api";
import { COLLECTIONS_OPTIONS } from "../../../utils/constants";
import { Dropdown } from "../../molecules/dropdown";
import { useMainContext } from "../../../utils";

import "../../../theme/variables.scss";

interface Props {}

export const CreateCard: FC<Props> = () => {
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [cardCreateStatus, setCardCreateStatus] = useState(
    CardCreateStatus.NEW
  );

  const dropdownOptions = COLLECTIONS_OPTIONS;
  const [cardCollection, setCardCollection] = useState(
    COLLECTIONS_OPTIONS[0].label
  );

  const { fetchCards } = useMainContext();

  const onSubmit: any = useCallback(
    (e: any) => {
      e.preventDefault();
      if (!cardFront || !cardBack || !cardCollection) {
        setEmptyFieldError(true);
      } else {
        setEmptyFieldError(false);
        const payload = {
          front: cardFront,
          back: cardBack,
          status: CardStatus.new,
          collectionName: cardCollection,
        };
        setCardCreateStatus(CardCreateStatus.PENDING);
        createCard(payload)
          .then(() => {
            setCardCreateStatus(CardCreateStatus.CREATED);
            setCardFront("");
            setCardBack("");
            fetchCards();
          })
          .catch((err) => {
            setCardCreateStatus(CardCreateStatus.FAILED);
            console.log(err);
          });
      }
    },
    [cardFront, cardBack, cardCollection, fetchCards]
  );

  const onChange = useCallback((e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "front") {
      setCardFront(value);
    } else {
      setCardBack(value);
    }
  }, []);

  const onDropdownSelect = useCallback((value) => {
    setCardCollection(value);
  }, []);

  return (
    <>
      <CreateCardWrapper>
        <h1>Create card</h1>
        <form action="submit" onSubmit={onSubmit} autoComplete="off">
          <div className="">
            <Input
              type="text"
              placeholder="Front"
              onChange={onChange}
              name="front"
              value={cardFront}
            />
          </div>
          <div className="">
            <Input
              type="text"
              placeholder="Back"
              onChange={onChange}
              value={cardBack}
              name="back"
            />
          </div>
          <div className="">
            <Dropdown
              onSelection={onDropdownSelect}
              options={dropdownOptions}
            />
          </div>

          <div className="">
            <Button className="create-card-button" type="submit">
              Submit
            </Button>
          </div>
          <CreateCardStatus status={cardCreateStatus} />
          {emptyFieldError && (
            <div className="">
              <p>You need to fill all the required forms</p>
            </div>
          )}
        </form>
      </CreateCardWrapper>
    </>
  );
};

const CreateCardWrapper = styled.div`
  width: 350px;
  padding: 50px;
  border: 1px solid white;
  background-color: var(--mine-shaft);
  color: white;

  .create-card-button {
    margin: 10px 0;
  }
`;
