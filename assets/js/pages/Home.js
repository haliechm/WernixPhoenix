import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "reactstrap";
import { NavBarMain, FlyInAnimation, Footer } from "./";
import {
  logo_gray_people,
  person_brain,
  computer,
  computer_person,
  people_talking,
} from "../../images";
import _ from "lodash";
import { slideOutRight } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { data } from "../utils";
import { Link } from "react-router-dom";

// used for words flying across main page (top and animation are randomly set for each word)
const styles = {
  slideOutRight: {
    animation: "x 18s linear infinite",
    animationName: Radium.keyframes(slideOutRight, "slideOutRight"),
    top: 0,
  },
};

export default function Home(props) {
  useEffect(() => {
    window.addEventListener("scroll", handleScrolling);
    return () => {
      window.removeEventListener("scroll", handleScrolling);
    };
  }, []);

  const [showItems, setShowItems] = useState(false);

  // controls if login/signup are show depending on scrolling/where users is on page
  function handleScrolling() {
    try {
      var lang_carousel_position = document
        .getElementById("language-carousel")
        .getBoundingClientRect();
      lang_carousel_position.top <= 0
        ? setShowItems(true)
        : setShowItems(false);
    } catch {}
  }

  // controls beginning of the language words going across the screen
  function createFlyInAnimation() {
    let wordsToReturn = _.map(data.languageTranslationsArray, (word) =>
      createLanguageWordFlyIn(word)
    );
    return wordsToReturn;
  }

  // creates each individual langauge word and randomly sets height and speed
  function createLanguageWordFlyIn(word) {
    styles.slideOutRight.top = `${_.random(10, 90)}%`;
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
      <NavBarMain showItems={showItems} />
      {/* top half of page (language words fly-in and buttons) */}
      <Container id="main" className="no-padding bg-light" fluid>
        <Row id="main-page-background" className="no-margin">
          {createFlyInAnimation()}

          <Col md="5" className="no-padding">
            <div>
              <img
                src={logo_gray_people}
                alt="people talking image"
                width="75%"
                // height="350"
              ></img>
            </div>
          </Col>
          <Col md="6" className="no-padding" id="main-page-content">
            <Row className="no-margin mb-4">
              <Col className="no-padding">
                <p>
                  Improve your language skills through direct communication with
                  other language learners
                </p>
              </Col>
            </Row>
            <Row className="no-margin">
              <Col className="no-padding"></Col>
              <Col md="6" className="no-padding">
                <Link to="register">
                  <Button className="main-page-button sign-up-button">
                    SIGN UP
                  </Button>
                </Link>
              </Col>
              <Col className="no-padding"></Col>
            </Row>
            <Row className="no-margin">
              <Col className="no-padding"></Col>
              <Col md="6" className="no-padding">
                <Link to="login">
                  <Button className="main-page-button account-button">
                    I ALREADY HAVE AN ACCOUNT
                  </Button>
                </Link>
              </Col>
              <Col className="no-padding"></Col>
            </Row>
          </Col>
          <Col className="no-padding"></Col>
        </Row>
        <div id="language-carousel"></div>
      </Container>
      {/* {scrolling()} */}

      {/* bottom half of page (explanation of Wernix) */}
      <Container className="bg-light" style={{ width: "100vw" }} fluid>
        {/* first row - what is wernix */}
        <Row className="homepage-row">
          <Col sm={2}></Col>
          <Col className="no-padding">
            <h4>The #1 way to become fluent in a language</h4>
            <p>
              Wernix is a stress-fee, no-cost way to develop language skills.
              Users are able to experience speaking in different languages by
              chatting with strangers around the world.
            </p>
          </Col>

          <Col sm={2} className="no-padding">
            <img
              src={person_brain}
              alt="person images"
              width="200"
              height="200"
            ></img>
          </Col>
        </Row>
        {/* title of second row - features of wernix */}
        <Row className="mb-4">
          <Col>
            <h4>Features that make your language-learning experience better</h4>
          </Col>
        </Row>
        {/* second row - features of wernix */}
        <Row className="homepage-row wernix-features">
          <Row>
            <Col sm={4}>
              <Row>
                <Col xs={12} className="wernix-features-col">
                  <ul className="no-bullet">
                    <li className="checkmark">
                      <h5>Video</h5>
                    </li>
                    <p>
                      Video messaging allows users to see and hear one another.
                      Visual and auditory cues are proven to be extremely
                      helpful when learning a language
                    </p>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="wernix-features-col">
                  <ul className="no-bullet">
                    <li className="checkmark">
                      <h5>Text Messaging</h5>
                    </li>
                    <p>
                      For users that feel more comfortable with typing in a new
                      language, or for users that want to improve their written
                      communication
                    </p>
                  </ul>
                </Col>
              </Row>
            </Col>

            <Col className="no-padding">
              <img
                src={computer}
                alt="computer graphic"
                width="250"
                height="250"
              ></img>
            </Col>

            <Col sm={4} className="no-padding">
              <Row>
                <Col xs={12} className="wernix-features-col">
                  <ul className="no-bullet">
                    <li className="checkmark">
                      <h5>High-Quality Matching System</h5>
                    </li>
                    <p>
                      We believe in matching our users with the <i>right</i>{" "}
                      strangers. Through our advanced matching process, you can
                      rest assured that you will be getting the most out of your
                      time
                    </p>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col xs={12} className="wernix-features-col">
                  <ul className="no-bullet">
                    <li className="checkmark">
                      <h5>Embedded Translation</h5>
                    </li>
                    <p>
                      Translate with ease using our built-in translator! You
                      won't have to switch tabs when you need to translate
                    </p>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </Row>
        {/* title of third row - matching system */}
        <Row className="mb-4">
          <Col>
            <h4>How we match our users</h4>
          </Col>
        </Row>
        {/* third row - matching System */}
        <Row className="homepage-row wernix-features">
          <Col xs={3}>
            <img
              src={people_talking}
              alt="image of person at computer"
              width="100%"
              // height="100%"
            ></img>
          </Col>
          <Col xs={9} className="no-padding wernix-features-col">
            <ul className="no-bullet">
              <li className="arrow-small">
                We match each user with other users in a way that both parties
                can benefit. For example, if you want to practice Russian and
                are fluent in English, you will be matched with users that are
                fluent in Russian and want to speak English
              </li>
              <li className="arrow-small">
                You will be matched with users depending on both your and their
                experience levels. You can choose if you would rather be matched
                with people who are proficient at speaking your native language
                or people who are just beginning
              </li>
              <li className="arrow-small">
                Users are able to rate their experience with another user. As a
                reward, higher-rating users will be matched with other
                higher-rating users. This will allow users that take the
                language-learning experience seriously to be matched with others
                that do the same
              </li>
            </ul>
          </Col>

          <Col xs={9} className="no-padding  wernix-features-col">
            <ul className="no-bullet">
              <li className="arrow-small">
                If you meet users that you want to continue to chat with on
                another day, you can save their info! This allows Wernix users
                to develop and continue relationships with other users that will
                enhance their language-learning experience
              </li>
              <li className="arrow-small">
                To keep our website safe, we will match users 18+ only with
                other users 18+, and users that are under 18 with only users
                that are under 18. Please report and block users that are not
                abiding by this system
              </li>
            </ul>
          </Col>

          <Col xs={3}>
            <img
              src={computer_person}
              alt="image of person at computer"
              width="100%"
              // height="100%"
            ></img>
          </Col>
        </Row>
      </Container>
      <Footer mainPage={true} />
    </StyleRoot>
  );
}
