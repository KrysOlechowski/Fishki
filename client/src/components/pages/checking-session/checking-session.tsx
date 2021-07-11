import { FC } from "react";
import styled from "styled-components/macro";

import { LoaderDots } from "../../../assets/animations/loader-dots";

import "../../../theme/variables.scss";
interface Props {}

export const CheckingSession: FC<Props> = () => {
  return (
    <Wrapper>
      <div className="container">
        <div className="text-container">Checking Session</div>
        <div className="loader-container">{<LoaderDots color="#fff" />}</div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: linear-gradient(#d9d8df, #a19eae);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .container {
    display: flex;
    align-items: baseline;
  }

  .text-container {
    margin-right: 10px;
    font-size: 2rem;
    color: white;
  }
`;
