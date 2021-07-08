import React, { FC, useCallback, useState } from "react";
import styled from "styled-components/macro";

import { login, checkSession } from "../../../utils";
import { useMainContext } from "../../../utils";

import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";

import "../../../theme/variables.scss";

interface Props {}

export const LoginForm: FC<Props> = () => {
  const [username, setUserName] = useState("user");
  const [password, setPassword] = useState("pass");

  const { isTestMode } = useMainContext();

  const onInputChange = useCallback((e) => {
    const { value, name } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const loginValues = {
        username: username,
        password: password,
      };
      login(loginValues).then((res) => {
        console.log(res);
      });
    },
    [username, password]
  );

  const onSessionCheck = useCallback(() => {
    checkSession().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name="username"
          value={username}
          onChange={onInputChange}
          type="text"
          placeholder="User Name"
        />
        <Input
          name="password"
          value={password}
          onChange={onInputChange}
          type="text"
          placeholder="Password"
        />
        <Button className="login-form-button" type="submit">
          Login
        </Button>
        {isTestMode && (
          <Button
            onClick={onSessionCheck}
            className="login-form-button"
            type="button"
          >
            Check Session
          </Button>
        )}
      </Form>
    </Container>
  );
};

const Form = styled.form``;

const Container = styled.div`
  border: 1px solid white;

  .login-form-button {
    max-width: 200px;
  }
`;
