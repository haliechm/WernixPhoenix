import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  Form,
  Row,
  Col,
  Container,
  Button,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormText,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import { api, helpers, contexts } from "../utils";
const { UserContext } = contexts;
import _ from "lodash";
import Logo from "../../images/logo.png";
import { slideOutRight } from "react-animations";
import { data } from "../utils";
import Radium, { StyleRoot } from "radium";
import { TermsAndPrivacyModal } from "./";
import { Slider } from "@material-ui/core";

// used for words flying across main page (top and animation are randomly set for each word)
const styles = {
  slideOutRight: {
    animation: "x 18s linear infinite",
    animationName: Radium.keyframes(slideOutRight, "slideOutRight"),
    top: 0,
  },
};

const marks = [
  {
    value: 1,
    label: "newbie",
  },
  {
    value: 2,
    label: "beginner",
  },
  {
    value: 3,
    label: "intermediate",
  },
  {
    value: 4,
    label: "advanced",
  },
  {
    value: 5,
    label: "expert",
  },
];

export default function Register(props) {
  // state for controlling terms & privacy modals
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [reenterPasswordShown, setReenterPasswordShown] = useState(false);
  const [wantToLearnLanguage, setWantToLearnLanguage] = useState("Swahili");
  const [nativeLanguage, setNativeLanguage] = useState("English");
  const [othersSkillLevel, setOthersSkillLevel] = useState("__________");

  // controls beginning of the language words going across the screen
  function createFlyInAnimation() {
    let wordsToReturn = _.map(data.languageTranslationsArray, (word) =>
      createLanguageWordFlyIn(word)
    );
    return wordsToReturn;
  }

  // creates each individual langauge word and randomly sets height and speed
  function createLanguageWordFlyIn(word) {
    styles.slideOutRight.top = `${_.random(1, 100)}%`;
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
  function getLabel(value) {
    switch (value) {
      case 1:
        return "N";

      case 2:
        return "B";

      case 3:
        return "I";

      case 4:
        return "A";

      case 5:
        return "E";

      default:
        throw "Vaue must be between 0 and 4";
    }
  }

  //   return <Container>halie</Container>;
  return (
    <StyleRoot>
      {/* {createFlyInAnimation()} */}
      {/* register form */}
      <Container
        style={{ backgroundColor: "white" }}
        className="no-padding bg-light"
        id="main"
        fluid
      >
        <Row
          className="no-margin"
          style={{ height: "10%", display: "flex", alignItems: "center" }}
        >
          <Col className="float-left ml-3">
            <Link to="/">
              <i className="fas fa-times float-left text-secondary up-front"></i>
            </Link>
          </Col>
        </Row>

        <Row className="no-margin mt-4 bg-light">
          <Col xs={{ size: 8, offset: 2 }} className="no-padding">
            <Form>
              <FormText className="mb-4">
                <h2 className="up-front">Register</h2>
              </FormText>
              <FormGroup row>
                <Col className="up-front register-form-label" lg={4} xs={12}>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    id="user_first_name"
                    placeholder="your first name"
                    bsSize="sm"
                  />
                </Col>

                <Col className="up-front register-form-label" lg={4} xs={12}>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="user_last_name"
                    placeholder="your last name"
                    bsSize="sm"
                  />
                </Col>
                <Col className="up-front register-form-label" lg={4} xs={12}>
                  <Label>Username</Label>
                  {/* <Input
                    type="text"
                    name="username"
                    id="user_username"
                    placeholder="your username"
                    bsSize="sm"
                  /> */}
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      name="username"
                      id="user_username"
                      placeholder="your username"
                      bsSize="sm"
                    />
                  </InputGroup>
                </Col>
              </FormGroup>
              {/* NEW NEW START */}
              <FormGroup row>
                <Col className="up-front register-form-label" lg={6} xs={12}>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="user_email"
                    placeholder="your email address"
                    bsSize="sm"
                  />
                </Col>

                <Col className="up-front register-form-label" lg={3} xs={12}>
                  <Label>Password</Label>
                  <div className="pass-wrapper">
                    <Input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      id="user_password"
                      placeholder="make it a good one..."
                      bsSize="sm"
                    />
                    <i
                      onClick={() => setPasswordShown(!passwordShown)}
                      className={
                        passwordShown
                          ? "fas fa-eye-slash eyeball"
                          : "fas fa-eye eyeball"
                      }
                    ></i>
                  </div>
                </Col>
                <Col className="up-front register-form-label" lg={3} xs={12}>
                  <Label>Re-Enter Password</Label>
                  <div className="pass-wrapper">
                    <Input
                      type={reenterPasswordShown ? "text" : "password"}
                      name="reenter_password"
                      id="user_reenter_password"
                      placeholder="re-enter password"
                      bsSize="sm"
                    />
                    <i
                      onClick={() =>
                        setReenterPasswordShown(!reenterPasswordShown)
                      }
                      className={
                        reenterPasswordShown
                          ? "fas fa-eye-slash eyeball"
                          : "fas fa-eye eyeball"
                      }
                    ></i>
                    {/* <i
                      onClick={() =>
                        setReenterPasswordShown(!reenterPasswordShown)
                      }
                      className={
                        reenterPasswordShown
                          ? "bi-eye-css bi-eye-fill-css"
                          : "bi-eye-css bi-eye-fill-css"
                      }
                    ></i> */}
                  </div>
                </Col>
              </FormGroup>
              {/* NEW NEW END */}
              {/* NEW START */}
              <FormGroup row>
                <Col className="up-front register-form-label" lg={4} xs={12}>
                  <Label for="exampleSelect">Native Language</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) =>
                      setNativeLanguage(
                        e.target.options[e.target.selectedIndex].text
                      )
                    }
                  >
                    <option>English</option>
                    <option>German</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Italian</option>
                    <option>Russian</option>
                    <option>Swahili</option>
                  </Input>
                </Col>
                <Col className="up-front register-form-label" lg={4} xs={12}>
                  <Label for="exampleSelect">I want to pratice</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(e) =>
                      setWantToLearnLanguage(
                        e.target.options[e.target.selectedIndex].text
                      )
                    }
                  >
                    <option>Swahili</option>
                    <option>English</option>
                    <option>German</option>
                    <option>French</option>
                    <option>Spanish</option>
                    <option>Italian</option>
                    <option>Russian</option>
                  </Input>
                </Col>
                <Col className="up-front register-form-label" lg={4} xs={12}>
                  <Label>Birthdate</Label>
                  <Input
                    type="email"
                    name="email"
                    id="user_email"
                    placeholder="MM/DD/YYYY"
                    bsSize="sm"
                  />
                </Col>
              </FormGroup>
              {/* NEW END */}
              {/* START */}
              <FormGroup row>
                <Col className="up-front register-form-label" lg={8} xs={12}>
                  <Label for="skill-slider" id="slider-label">
                    My skill level in <b>{wantToLearnLanguage}</b>:
                  </Label>
                  <Slider
                    defaultValue={3}
                    aria-labelledby="slider-label"
                    step={1}
                    marks={marks}
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => getLabel(value)}
                    id="skill-slider"
                    color="danger"
                    style={{ color: "#8ad1a6" }}
                  />
                </Col>

                {/* <Col className="up-front register-form-label" lg={9} xs={12}>
                  <Label>
                    I prefer to be matched with people that are{" "}
                    <b>{othersSkillLevel}</b> in {nativeLanguage}{" "}
                  </Label>
                  <Form>
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="others_skill_level"
                          id="newbie"
                          value="newbies"
                          checked={othersSkillLevel == "newbies"}
                          onChange={(e) => setOthersSkillLevel(e.target.value)}
                        />{" "}
                        newbies
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="others_skill_level"
                          id="beginner"
                          value="beginners"
                          checked={othersSkillLevel == "beginners"}
                          onChange={(e) => setOthersSkillLevel(e.target.value)}
                        />{" "}
                        beginners
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          color="default"
                          name="others_skill_level"
                          id="intermediate"
                          value="intermediate"
                          checked={othersSkillLevel == "intermediate"}
                          onChange={(e) => setOthersSkillLevel(e.target.value)}
                        />{" "}
                        intermediate
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="others_skill_level"
                          id="advanced"
                          value="advanced"
                          checked={othersSkillLevel == "advanced"}
                          onChange={(e) => setOthersSkillLevel(e.target.value)}
                        />{" "}
                        advanced
                      </Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Label check>
                        <Input
                          type="radio"
                          name="others_skill_level"
                          id="expert"
                          value="experts"
                          checked={othersSkillLevel == "experts"}
                          onChange={(e) => setOthersSkillLevel(e.target.value)}
                        />{" "}
                        experts
                      </Label>
                    </FormGroup>
                  </Form>
                </Col> */}
              </FormGroup>

              {/* END */}
              <FormGroup row>
                <Col lg={{ size: 4, offset: 4 }}>
                  <Button className="main-page-button account-button ">
                    SIGN UP
                  </Button>
                </Col>
              </FormGroup>

              {/* add terms and conditions modal here */}
              <FormText color="muted" className="pos-rel up-front">
                By registering with Wernix, you agree to our{" "}
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
                <Col lg={{ size: 4, offset: 4 }}>
                  <Link to="login">
                    <Button className="main-page-button sign-up-button mt-2 up-front">
                      LOG IN
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
