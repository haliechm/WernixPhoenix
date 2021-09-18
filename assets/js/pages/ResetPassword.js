import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Container, Col, Row, Card, CardBody, Alert, Button, Label, Input } from 'reactstrap';
import {helpers, api} from '../utils';
import Logo from "../../images/logo.png";

export default function ResetPassword(props) {
  const [authData, setAuthData] = useState({
      password: "", 
      passwordAgain: "",
      resetToken: props?.computedMatch?.params?.resetToken
        ? props.computedMatch.params.resetToken
        : null
    });
  const [redirectTo, setRedirectTo] = useState("");
  const [message, setMessage] = useState(null);

  function onChange(fieldName, fieldValue) {
    let newData = Object.assign({}, authData);
    newData[fieldName] = fieldValue;
    setAuthData(newData);
  }

  function validate() {
    let warnings = [];
    if (!authData.password || authData.password.length < 8) {
      warnings.push("Password is required and must be at least 8 characters long.");
    }
    if (authData.password !== authData.passwordAgain) {
      warnings.push("The password and password confirmation do not match.");
    }
    return warnings;
  }

  function onSubmit() {
    const warnings = validate();
    if (warnings.length) {
      setMessage({
        text: warnings.join(' '),
        flavor: 'danger'
      });
      return;
    } else {
      setMessage(null);
    }
    api.post('set_password',{token: authData.resetToken, password: authData.password }).then((response) => {
      if (response.data.success) {
        setMessage({ flavor: "success", text: "You have successfully reset your password. We're now redirecting you to the home screen." })
        setTimeout(() => {
          setRedirectTo("/");
        }, 5000);
      } else {
        setMessage({ flavor: "danger", text: response.data.message });
      }
    }).catch(helpers.catchHandler);
  }

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <a href='/'><img id="Logo" src={Logo} alt="Logo" /></a>
        </Col>
        <Col className="ml-3">
          <Card>
            <CardBody>
              <div>
                <Link to='/'>Return to Login Screen</Link>
              </div>
              <div>
                {message
                  ? <Alert className={message.flavor}>{message.text}</Alert>
                  : null
                }
              </div>
              <div>
                <form>
                  <Row className="mt-2 mb-2">
                    <Col>
                      <Label className="label"> New Password </Label>
                      <Input type="password"
                        value={authData.password}
                        onChange={(e) => onChange("password", e.target.value)}
                        placeholder="Password"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <Label className="label"> Confirm Password </Label>
                      <Input type="password"
                        value={authData.passwordAgain}
                        onChange={(e) => onChange("passwordAgain", e.target.value)}
                        placeholder="Re-Type Password"
                      />
                    </Col>
                  </Row>
                  <Button className="projectPrimary float-right" onClick={onSubmit}>
                    Confirm Password Reset
                  </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>);
}