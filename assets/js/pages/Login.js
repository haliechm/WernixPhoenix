import React, { useState } from "react";
import {
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
import { Link } from "react-router-dom";
import _ from "lodash";
import { slideOutRight } from "react-animations";
import { data } from "../utils";
import Radium, { StyleRoot } from "radium";
import { TermsAndPrivacyModal } from "./";

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

  return (
    <StyleRoot>
      {createFlyInAnimation()}
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
              <i className="bi bi-x-lg float-left text-secondary up-front"></i>
            </Link>
          </Col>
        </Row>

        <Row className="no-margin mt-4">
          <Col
            xs={{ size: 8, offset: 2 }}
            md={{ size: 4, offset: 4 }}
            className="no-padding"
          >
            <Form>
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
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col>
                  <Button className="main-page-button account-button ">
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
