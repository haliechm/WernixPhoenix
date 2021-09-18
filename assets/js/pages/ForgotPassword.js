import React, { useState, useContext, useEffect } from "react";
import helpers from '../utils/helpers';
import { Container, Col, Row, Card, CardBody, Alert, Button, Label, Input } from 'reactstrap';
import api from '../utils/api';
import { Link, Redirect } from 'react-router-dom';
import Logo from "../../images/logo.png";

export default function ForgotPassword(props) {
  const [authData, setAuthData] = useState({username: ""});
  const [redirectTo, setRedirectTo] = useState("");
  const [message, setMessage] = useState(null);

  function validate() {
    let warnings = [];
    if (!authData.username) {
      warnings.push("Username is required (usually your email address)");
    }
    return warnings;
  }

  function onChange(fieldName, fieldValue) {
    let newData = Object.assign({}, authData);
    newData[fieldName] = fieldValue;
    setAuthData(newData);
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
    api.post('forgot_password', {username: authData.username}).then((response) => {
      if (response.data.success) {
        setMessage({ flavor: "success", text: "If we have a user with that address, we've just sent a reset link!" })
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
          <a href='/'><img id="Logo" src={Logo} alt="Logo"/></a>
        </Col>
        <Col className="ml-3">
          <Card>
            <CardBody>
              <div>
                <Link to='/'> Wait, I already have an account - take me to log in!</Link>
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
                      <Label className="Label">Enter your username (probably your e-mail address) and we will send you a reset link.</Label>
                      <Input type="text"
                        value={authData.username}
                        onChange={(e) => onChange("username", e.target.value)}
                        placeholder="Username"
                        maxLength="250"
                      />
                    </Col>
                  </Row>
                  <Button className="projectPrimary float-right" onClick={onSubmit}>
                    Reset Password
                  </Button>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>);
}
