import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import _ from "lodash";
import { slideOutRight } from "react-animations";
import { data } from "../utils";
import Radium, { StyleRoot } from "radium";
import { TermsAndPrivacyModal } from "./";
import { api, helpers } from "../utils";

// used for words flying across main page (top and animation are randomly set for each word)
const styles = {
  slideOutRight: {
    animation: "x 18s linear infinite",
    animationName: Radium.keyframes(slideOutRight, "slideOutRight"),
    top: 0,
  },
};

export default function Login() {
  // state for controlling terms & privacy modals
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  // controls beginning of the language words going across the screen
  function createFlyInAnimation() {
    let wordsToReturn = _.map(data.languageTranslationsArray, (word) =>
      createLanguageWordFlyIn(word)
    );
    return wordsToReturn;
  }

  // creates each individual langauge word and randomly sets height and speed
  function createLanguageWordFlyIn(word) {
    styles.slideOutRight.top = `${_.random(1, 90)}%`;
    styles.slideOutRight.animation = `x ${_.random(8, 25)}s linear infinite`;

    return (
      <p
        style={{ ...styles.slideOutRight }}
        className="language-word-fly-in"
        key={`${word}-${_.random(0, 1000)}`}
      >
        {word}
      </p>
    );
  }

  // used for changing username/password while typing
  function handleUsername(e) {
    setUserName(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // gets called when user hits submit button
  function handleSubmit(e) {
    console.log("e: ", e);
    e.preventDefault();
    api
      .post("log_in", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("getting here");
          setMessage({ flavor: "success", text: "Log-In Successful!" });
          // userCtx.signIn(response.data.user, response.data.token);
        } else {
          console.log("actually, getting here");
          setMessage({ flavor: "danger", text: response.data.message });
        }
      })
      .catch(helpers.catchHandler);
  }

  return (
    <StyleRoot>
      {message ? (
        <Row className="mb-2">
          <Col>
            <Alert color={message.flavor}>{message.text}</Alert>
          </Col>
        </Row>
      ) : null}
      {/* {createFlyInAnimation()} */}
      {/* current users login form */}
      <Container
        // style={{ backgroundColor: "white" }}
        className="no-padding bg-light"
        id="main"
        fluid
      >
        <Row
          className="no-margin"
          style={{ height: "13%", display: "flex", alignItems: "center" }}
        >
          <Col className="float-left ml-3">
            <Link to="/">
              <i className="fas fa-times float-left text-secondary up-front"></i>
              {/* <i className="bi bi-x-lg float-left text-secondary up-front"></i> */}
            </Link>
          </Col>
        </Row>

        <Row className="no-margin mt-4">
          <Col
            xs={{ size: 8, offset: 2 }}
            md={{ size: 4, offset: 4 }}
            className="no-padding"
          >
            <Form onSubmit={handleSubmit}>
              <FormText>
                <h2 className="up-front">Log In</h2>
              </FormText>
              <FormGroup row>
                <Col className="up-front">
                  <Input
                    type="email"
                    name="email"
                    id="user_email"
                    placeholder="email or username"
                    value={username}
                    onChange={handleUsername}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col className="up-front">
                  <Input
                    type="password"
                    name="password"
                    id="user_password"
                    placeholder="password"
                    value={password}
                    onChange={handlePassword}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button
                    type="submit"
                    className="main-page-button account-button "
                  >
                    LOG IN
                  </Button>
                </Col>
              </FormGroup>

              {/* add terms and conditions modal here */}
              <FormText color="muted" className="pos-rel up-front">
                By signing into Wernix, you agree to our{" "}
                <Link
                  onClick={() => {
                    setModalOpen(true);
                    setPrivacyPolicy(false);
                  }}
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  onClick={() => {
                    setModalOpen(true);
                    setPrivacyPolicy(true);
                  }}
                >
                  Privacy Policy
                </Link>
                .
              </FormText>

              {/* modals */}
              <TermsAndPrivacyModal
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                privacyPolicy={privacyPolicy}
              />

              <FormText color="muted" className="up-front">
                <hr />
                OR
              </FormText>

              <FormGroup row>
                <Col>
                  <Link to="Register">
                    <Button className="main-page-button sign-up-button mt-2 up-front">
                      CREATE AN ACCOUNT
                    </Button>
                  </Link>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </StyleRoot>
  );
}
