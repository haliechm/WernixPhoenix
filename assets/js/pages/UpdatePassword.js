import React, { Component, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Col, Row, Card, CardBody, Alert, Button, Label, Input, ButtonGroup } from 'reactstrap';
import helpers from '../utils/helpers';
import DebounceInput from "react-debounce-input";
import _ from "lodash";
import { api, contexts } from "../utils";
const { UserContext } = contexts;

export default function UpdatePassword(props) {
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState(userCtx.currentUser);
  const [redirectPath, setRedirectPath] = useState(null);
  const [message, setMessage] = useState(null);

  function onChange(fieldName, fieldValue) {
    let newUser = Object.assign({}, user);
    newUser[fieldName] = fieldValue;
    setUser(newUser);
  }

  function onUpdatePassword() {
    let warnings = [];
    if (!user.newPassword || _.trim(user.newPassword).length < 8) {
      warnings.push('Please provide a valid, new password of at least 8 characters.')
    }
    if (!user.oldPassword || _.trim(user.oldPassword).length < 8) {
      warnings.push('Please provide a valid, existing password of at least 8 characters.')
    }
    if (!user.newPasswordAgain || _.trim(user.newPasswordAgain).length < 8) {
      warnings.push('Please provide your valid, new password a second time.')
    }
    if (user.newPassword !== user.newPasswordAgain) {
      warnings.push('Your new password and password confirmation do not match.')
    }
    if (user.newPassword === user.oldPassword) {
      warnings.push('Your new password and old password must be different.')
    }
    if (warnings.length) {
      setMessage({
        text: warnings.join(' '),
        flavor: 'danger'
      });
      return;
    } else {
      setMessage(null);
    }
    api.post('update_password', {password: user.newPassword, old_password: user.oldPassword}).then(response => {
      if (response.data.success) {
        setMessage({text: "Your password has been updated successfully!. We're now redirecting you to the home screen.", flavor: "success"});
        const newUser = {
          ...user,
          mustChangePassword: false, oldPassword: "", newPassword: "", newPasswordAgain: ""
        };
        setUser(newUser);
        setTimeout(() => userCtx.signIn(newUser), 3000);
      } else {
        setMessage({text: response.data.message, flavor: "danger"});
      }
    }).catch(helpers.catchHandler);
  }

  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }
  return (
    <Container className="mt-5">
      <h4 className="my-4">Your password needs to be updated...</h4>
      {message
        ? <Alert className={message.flavor}>{message.text}</Alert>
        : null
      }
      <Row>
        <Col className="ml-3">
          <Card>
            <CardBody>
              <Row className="mb-1">
                <Col xs="12">
                  <div className="my-1">Old Password {helpers.requiredStar()}</div>
                  <DebounceInput
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    onChange={(event) => onChange(event.target.name, event.target.value)}
                    value={user.oldPassword || ""}
                    className="form-control"
                    debounceTimeout={300}
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col xs="12">
                  <div className="my-1">New Password {helpers.requiredStar()}</div>
                  <DebounceInput
                    type="password"
                    name="newPassword"
                    id="newPassword"
                      onChange={(event) => onChange(event.target.name, event.target.value)}
                    value={user.newPassword || ""}
                    className="form-control"
                    debounceTimeout={300}
                  />
                </Col>
              </Row>
              <Row className="mb-1">
                <Col xs="12">
                  <div className="my-1">Retype Password {helpers.requiredStar()}</div>
                  <DebounceInput
                    type="password"
                    name="newPasswordAgain"
                    id="newPasswordAgain"
                    onChange={(event) => onChange(event.target.name, event.target.value)}
                    value={user.newPasswordAgain || ""}
                    className="form-control"
                    debounceTimeout={300}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="12" className="text-right">
                  <Button
                    className="projectPrimary"
                    onClick={() => onUpdatePassword()}
                    size="sm"
                  >
                    Update Password
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
  </Container>);
}
