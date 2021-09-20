import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

export default function UserProfileTop(props) {
  return (
    <Container id="profile-top" className="no-padding mb-0 pb-0" fluid>
      <Row id="profile-page-background" className="profile-row">
        <Col
          md={{ size: 3, offset: 0 }}
          //   xs={{ size: 4, offset: 0 }}
          className="no-padding py-2 mb-2"
        >
          <img
            src="https://picsum.photos/180/180"
            alt="profile picture"
            style={{ borderRadius: "90px", border: "3px solid #308552" }}
          ></img>
          {/* <Image source={{ uri: "https://picsum.photos/200/200" }}/> */}
        </Col>

        <Col
          md={{ size: 4, offset: 0 }}
          xs={{ size: 8, offset: 2 }}
          className="no-padding large-text-align-left"
        >
          <h3>Halie</h3>
          <h6>@haliechm</h6>
          <h6>22 Friends</h6>
          <h6>Joined on 08/03/2021</h6>
          <h6>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i> (2.5/5.0)
          </h6>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
