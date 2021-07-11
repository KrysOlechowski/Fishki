import React, { FC, useCallback, useState } from "react";
import styled from "styled-components/macro";

import { login } from "../../../utils";
import { useMainContext } from "../../../utils";

import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";

import "../../../theme/variables.scss";

interface Props {}

const { bake_cookie } = require("sfcookies");

export const LoginForm: FC<Props> = () => {
  const [password, setPassword] = useState("pass");
  const [email, setEmail] = useState("email");

  const { isTestMode, checkSession } = useMainContext();

  const onInputChange = useCallback((e) => {
    const { value, name } = e.target;
    if (name === "emaill") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const loginValues = {
        email: email,
        password: password,
      };
      login(loginValues).then((res) => {
        if (!res.isMatch) {
          console.log("Invalid Password");
        } else {
          bake_cookie("fishki", res.sessionId);
          console.log("cookie created");
          checkSession();
        }
      });
    },
    [email, password, checkSession]
  );

  const onSessionCheck = useCallback(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          value={email}
          onChange={onInputChange}
          type="text"
          placeholder="Email"
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
