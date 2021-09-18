import React from "react";
import Loader from "react-loader-spinner";
import { Row, Col } from "reactstrap";

export default function ScreenLoader(props) {
  let message = props.message || "Loading...";
  let hideLoader = props.hideLoader || false;
  return (
    <Row className="p-4 align-content-center">
      <Col xs="1" />
      {hideLoader ? null : (
        <Col xs="3">
          <Loader
            type="BallTriangle"
            color="#0a64b8"
            secondaryColor="#0a7a2f"
            height={125}
            width={125}
            //timeout={15000} //15 secs
          />
        </Col>
      )}
      <Col>
        <h5 className="float-left">
          <strong>{message}</strong>
        </h5>
      </Col>
    </Row>
  );
}
