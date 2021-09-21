import React, { useState, useContext, useEffect } from "react";
import { Alert, Form, Row, Col, Container, Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import { api, helpers, contexts } from "../utils";
const { UserContext } = contexts;
import _ from "lodash";
import Logo from "../../images/logo.png";

export default function SignIn(props) {
  const userCtx = useContext(UserContext);
  const [username, setUserName] = useState(
    localStorage.getItem("lastUsername") || ""
  );
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);

  function handleUsername(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    api
      .post("log_in", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          setMessage({ flavor: "success", text: "Log-In Successful!" });
          userCtx.signIn(response.data.user, response.data.token);
        } else {
          setMessage({ flavor: "danger", text: response.data.message });
        }
      })
      .catch(helpers.catchHandler);
  }

  if (redirectTo) {
    console.log("REDIRECTING.........................");
    return <Redirect to={redirectTo} />;
  }
  const canSubmit =
    username && username.length > 2 && password && password.length > 7;
  return (
    <Container>
      {message ? (
        <Row className="mb-2">
          <Col>
            <Alert color={message.flavor}>{message.text}</Alert>
          </Col>
        </Row>
      ) : null}
      <Row className="mt-5 align-items-center">
        <Col md="6" xs="12">
          <Row
            style={{
              backgroundColor: "#FFF",
              borderRadius: "8px",
              padding: "16px 20px",
            }}
          >
            <Col sm="12">
              <Row>
                <Col sm="12" className="text-center">
                  <h4>
                    <strong>Sign In</strong>
                  </h4>
                </Col>
              </Row>
              <Row className="minHeight225 mb-4">
                <Col xs="12">
                  <Form id="sign_in_form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        className="form-control"
                        autoFocus
                        type="text"
                        style={{ marginTop: "0" }}
                        value={username}
                        onChange={handleUsername}
                        placeholder="Enter username"
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type="password"
                        style={{ marginTop: "0" }}
                        value={password}
                        onChange={handlePassword}
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        disabled={!canSubmit}
                        className={classnames(
                          { projectPrimary: canSubmit },
                          "float-right"
                        )}
                        style={{ marginTop: "0" }}
                      >
                        Sign In
                      </Button>
                    </div>
                    <div className="text-left mt-2">
                      <Link
                        to={{
                          pathname: "/forgot_password",
                          state: { email: username },
                          push: true,
                        }}
                      >
                        Misplaced your password?
                      </Link>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs="12" md="6" className="text-center">
          <img id="Logo" src={Logo} alt="E2 Quizzical Logo" width="376" />
        </Col>
      </Row>
    </Container>
  );
}
