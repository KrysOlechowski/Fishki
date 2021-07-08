import clsx from "clsx";
import { FC } from "react";

import styled from "styled-components/macro";
import { useMainContext } from "../../../utils";

interface Props {}

export const LoginStatus: FC<Props> = () => {
  const { isLoggedIn } = useMainContext();

  return (
    <Container className={clsx("wrapper")} isLoggedIn={isLoggedIn}>
      {isLoggedIn ? "Logged" : "NotLogged"}
    </Container>
  );
};

interface ContainerProps {
  isLoggedIn: boolean;
}

const Container = styled.div<ContainerProps>`
  border: 1px solid ${(props) => (props.isLoggedIn ? "green" : "red")};
  position: absolute;
  top: 0;
  right: 0;
`;
