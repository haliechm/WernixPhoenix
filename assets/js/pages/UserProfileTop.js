import React, { useContext } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { api, helpers, contexts, constants } from "../utils";
import _ from "lodash";
const { UserContext } = contexts;

export default function UserProfileTop(props) {
  const userCtx = useContext(UserContext);

  function getStars() {
    let stars = [];
    let wholeNumber = Math.floor(userCtx.currentUser?.rating);
    let decimalNumber = (userCtx.currentUser?.rating % 1).toFixed(2);
    let totalNumStars = 5;

    // whole-stars
    for (let i = 0; i < wholeNumber; i++) {
      stars.push(<i class="fas fa-star"></i>);
    }
    // determine if half-star or whole-star based on decimal part
    if (decimalNumber != 0.0) {
      stars.push(<i class="fas fa-star-half-alt"></i>);
    }
    // add empty starts if any left
    for (let i = 0; i < totalNumStars + 1 - stars.length; i++) {
      stars.push(<i class="far fa-star"></i>);
    }

    return stars;
  }

  function getJoinedOnDate() {
    let splitUpDate = userCtx.currentUser?.inserted_at?.split(/[- : T Z]/);
    if (splitUpDate) {
      return `${splitUpDate[1]}/${splitUpDate[2]}/${splitUpDate[0]}`;
    } else {
      return "not available";
    }
  }
  return (
    <Container id="profile-top" className="no-padding mb-0 pb-0" fluid>
      <Row id="profile-page-background" className="profile-row">
        <Col md={{ size: 3, offset: 0 }} className="no-padding py-2 mb-2">
          <img
            src="https://picsum.photos/180/180"
            alt="profile picture"
            style={{ borderRadius: "90px", border: "3px solid #308552" }}
          ></img>
        </Col>

        <Col
          md={{ size: 4, offset: 0 }}
          xs={{ size: 8, offset: 2 }}
          className="no-padding large-text-align-left"
        >
          <h3>{userCtx.currentUser?.first_name || "NO FIRST NAME"}</h3>
          <h6>@{userCtx.currentUser?.username || "NO USERNAME"}</h6>
          <h6>22 Friends</h6>
          <h6>Joined on {getJoinedOnDate()}</h6>
          <h6>
            {getStars()}({userCtx.currentUser?.rating}/5.0)
          </h6>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
