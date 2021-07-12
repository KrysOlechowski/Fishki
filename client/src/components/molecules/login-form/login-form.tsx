import React, { FC, useCallback, useState } from "react";
import styled from "styled-components/macro";

import { login } from "../../../utils";
import { useMainContext } from "../../../utils";

import { Input } from "../../atoms/input";
import { Button } from "../../atoms/button";

import "../../../theme/variables.scss";

interface Props {}

type Values = {
  email: string;
  password: string;
};

const { bake_cookie } = require("sfcookies");

export const LoginForm: FC<Props> = () => {
  const [password, setPassword] = useState("pass");
  const [email, setEmail] = useState("email");

  const { isTestMode, checkSession } = useMainContext();

  const onInputChange = useCallback((e) => {
    const { value, name } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }, []);

  const onSubmit = useCallback(
    (e, loginGuestValues?: Values) => {
      e && e.preventDefault();
      const loginValues = loginGuestValues
        ? loginGuestValues
        : {
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

  const onLoginAsGuest = useCallback(() => {
    const loginGuestValues = {
      email: "guest",
      password: "guest",
    };
    onSubmit(null, loginGuestValues);
  }, [onSubmit]);

  const onSessionCheck = useCallback(() => {
    checkSession();
  }, [checkSession]);

  return (
    <Container>
      <h1>Login:</h1>
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

        <div className="login-form-guest" onClick={onLoginAsGuest}>
          Or test as a guest
        </div>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-form-button {
    max-width: 200px;
  }

  .login-form-guest {
    color: #000;
    text-decoration: underline;
    margin-top: 10px;

    &:hover {
      cursor: pointer;
    }
  }
`;
