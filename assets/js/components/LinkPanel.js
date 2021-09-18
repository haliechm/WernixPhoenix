import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/*
  colSize: *optional* 1-12, default of 4
  routePath: navigate to this path upon click
  title: *optional* visible string
  count: *optional* number to display along with the title
*/
const LinkPanel = props => {
  return (
    <Col
      xs="6"
      sm={props.colSize || "4"}
      className="px-2 mb-3"
    >
      <Link to={props.routePath} className="no-decoration">
        <Row className="expand-md linkPanel p-2 justify-content-center mx-3">
          {props.iconKey && 
            <Col sm="3" className="icon-col mr-0 float-right pr-0">
              <FontAwesomeIcon
                size="3x"
                icon={props.iconKey}
                className="linkIcon"
              />
            </Col>
          }
          <Col className="text-center">
            {props.count !== undefined ? (
              <div className="count">{props.count}</div>
            ) : null}
            <div className="title float-right fontSize150">{props.title}</div>
          </Col>
        </Row>
      </Link>
    </Col>
  );
}

export default LinkPanel;
