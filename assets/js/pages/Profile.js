import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Media } from "react-breakpoints";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import {
  Card,
  CardBody,
  Col,
  Button,
  Row,
  ButtonGroup,
  Alert,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
} from "reactstrap";
import DebounceInput from "react-debounce-input";
import Select from "react-select";
import _ from "lodash";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function Profile(props) {
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState(userCtx.currentUser);
  const [inviteToken, setInviteToken] = useState(null);
  const [redirectPath, setRedirectPath] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("DETAILS");
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    setUser(userCtx.currentUser);
  }, [userCtx.currentUser]);

  function onChange(fieldName, fieldValue) {
    let newUser = Object.assign({}, user);
    newUser[fieldName] = fieldValue;
    setUser(newUser);
  }

  function onSubmit() {
    let warnings = [];
    if (!user.first_name || _.trim(user.first_name).length < 2) {
      warnings.push("Please provide a valid first name.");
    }
    if (!user.last_name || _.trim(user.last_name).length < 2) {
      warnings.push("Please provide a valid last name.");
    }
    if (!user.username || _.trim(user.username).length < 2) {
      warnings.push("Please provide a username.");
    }
    if (!user.mobile_number || _.trim(user.mobile_number).length < 2) {
      warnings.push("Please provide a mobile #.");
    }
    if (!user.email || !helpers.emailIsValid(user.email)) {
      warnings.push("Please provide a valid email.");
    }
    if (warnings.length) {
      setMessage({
        text: warnings.join(" "),
        flavor: "danger",
      });
      return;
    } else {
      setMessage(null);
    }
    let payload = new FormData();
    payload.append("id", user.id);
    payload.append("first_name", user.first_name);
    payload.append("middle_name", user.middle_name);
    payload.append("last_name", user.last_name);
    payload.append("email", user.email);
    payload.append("mobile_number", user.mobile_number);
    if (profilePicture) {
      payload.append("image_url", profilePicture);
    }
    api
      .post_form_data("save_profile", payload)
      .then((response) => {
        if (response.data.success) {
          if (response.data.image_url) {
            user.image_url = response.data.image_url;
            userCtx.addPhotoToUser(response.data.image_url);
          }
          setMessage({
            text: "Your profile has been updated successfully!",
            flavor: "success",
          });
          setTimeout(() => userCtx.signIn(user), 3000);
        } else {
          setMessage({ text: response.data.message, flavor: "danger" });
        }
      })
      .catch(helpers.catchHandler);
  }

  function onUpdatePassword() {
    let warnings = [];
    if (!user.newPassword || _.trim(user.newPassword).length < 8) {
      warnings.push(
        "Please provide a valid, new password of at least 8 characters."
      );
    }
    if (!user.oldPassword || _.trim(user.oldPassword).length < 8) {
      warnings.push(
        "Please provide a valid, existing password of at least 8 characters."
      );
    }
    if (!user.newPasswordAgain || _.trim(user.newPasswordAgain).length < 8) {
      warnings.push("Please provide your valid, new password a second time.");
    }
    if (user.newPassword !== user.newPasswordAgain) {
      warnings.push(
        "Your new password and password confirmation do not match."
      );
    }
    if (user.newPassword === user.oldPassword) {
      warnings.push("Your new password and old password must be different.");
    }
    if (warnings.length) {
      setMessage({
        text: warnings.join(" "),
        flavor: "danger",
      });
      return;
    } else {
      setMessage(null);
    }
    api
      .post("update_password", {
        password: user.newPassword,
        old_password: user.oldPassword,
      })
      .then((response) => {
        if (response.data.success) {
          setMessage({
            text: "Your password has been updated successfully!",
            flavor: "success",
          });
          setUser({
            ...user,
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
          });
        } else {
          setMessage({ text: response.data.message, flavor: "danger" });
        }
      })
      .catch(helpers.catchHandler);
  }

  if (redirectPath) {
    return <Redirect to={redirectPath} />;
  }
  if (!user) {
    return <Redirect to="/" />;
  }
  const isImpersonating = localStorage.getItem("adminToken") ? true : false;
  const navLinks = (
    <Fragment>
      <NavItem>
        <NavLink
          className={classnames({
            active: activeTab === "DETAILS",
          })}
          onClick={() => setActiveTab("DETAILS")}
        >
          Details
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: activeTab === "PHOTO",
          })}
          onClick={() => setActiveTab("PHOTO")}
        >
          Photo
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          className={classnames({
            active: activeTab === "PASSWORD",
          })}
          onClick={() => setActiveTab("PASSWORD")}
        >
          Password
        </NavLink>
      </NavItem>
    </Fragment>
  );
  const tabContent = (
    <TabContent activeTab={activeTab}>
      <TabPane tabId="DETAILS">
        <Card>
          <CardBody>
            <Row className="mb-2 align-items-end">
              <Col xs="12">
                <Row className="mb-1">
                  <Col xs="4">
                    First Name {helpers.requiredStar()}
                    <DebounceInput
                      type="text"
                      name="first_name"
                      id="first_name"
                      onChange={(event) =>
                        onChange(event.target.name, event.target.value)
                      }
                      value={user.first_name || ""}
                      maxLength="35"
                      className="form-control"
                      debounceTimeout={300}
                    />
                  </Col>
                  <Col xs="4">
                    Middle Name
                    <DebounceInput
                      type="text"
                      name="middle_name"
                      id="middle_name"
                      onChange={(event) =>
                        onChange(event.target.name, event.target.value)
                      }
                      value={user.middle_name || ""}
                      maxLength="35"
                      className="form-control"
                      debounceTimeout={300}
                    />
                  </Col>
                  <Col xs="4">
                    Last Name {helpers.requiredStar()}
                    <DebounceInput
                      type="text"
                      name="last_name"
                      id="last_name"
                      onChange={(event) =>
                        onChange(event.target.name, event.target.value)
                      }
                      value={user.last_name || ""}
                      maxLength="35"
                      className="form-control"
                      debounceTimeout={300}
                    />
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col xs="4">
                    Mobile # {helpers.requiredStar()}
                    <DebounceInput
                      type="text"
                      name="mobile_number"
                      id="mobile_number"
                      onChange={(event) =>
                        onChange(event.target.name, event.target.value)
                      }
                      value={user.mobile_number || ""}
                      maxLength="15"
                      className="form-control"
                      debounceTimeout={300}
                    />
                  </Col>
                  <Col xs="8">
                    Email {helpers.requiredStar()}
                    <DebounceInput
                      type="text"
                      name="email"
                      id="email"
                      onChange={(event) =>
                        onChange(event.target.name, event.target.value)
                      }
                      value={user.email || ""}
                      maxLength="150"
                      className="form-control"
                      debounceTimeout={300}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Button
                      className="projectPrimary mt-3 float-right"
                      size="lg"
                      onClick={() => onSubmit()}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
                {isImpersonating ? (
                  <Row>
                    <Col xs="4">
                      <Button
                        color="dark"
                        onClick={() => userCtx.clearImpersonation()}
                      >
                        Stop Impersonating
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </TabPane>
      <TabPane tabId="PHOTO">
        <Card>
          <CardBody>
            <Row>
              <Col>
                {user.image_url ? (
                  <img src={user.image_url} className="pb-3" />
                ) : null}
              </Col>
              <Col>
                <Dropzone
                  className="col-xs-4"
                  accept={"image/png, image/jpeg, image/gif"}
                  onDrop={(files) => setProfilePicture(files[0])}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p
                          style={{ textAlign: "center" }}
                          className={classnames({
                            "text-success": profilePicture !== null,
                          })}
                        >
                          <FontAwesomeIcon
                            icon={profilePicture ? "check" : "file-upload"}
                            size="6x"
                          />
                        </p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                {profilePicture ? (
                  <Button
                    className="projectPrimary mt-3 float-right"
                    size="lg"
                    onClick={() => onSubmit()}
                  >
                    Save
                  </Button>
                ) : null}
              </Col>
            </Row>
          </CardBody>
        </Card>
      </TabPane>
      <TabPane tabId="PASSWORD">
        <Card>
          <CardBody>
            <Row className="mb-1">
              {inviteToken ? null : (
                <Col xs="6">
                  <div className="my-1">
                    Old Password {helpers.requiredStar()}
                  </div>
                  <DebounceInput
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    onChange={(event) =>
                      onChange(event.target.name, event.target.value)
                    }
                    value={user.oldPassword || ""}
                    className="form-control"
                    debounceTimeout={300}
                  />
                </Col>
              )}
            </Row>
            <Row className="mb-1">
              <Col xs="6">
                <div className="my-1">
                  {inviteToken ? null : `New `}Password {helpers.requiredStar()}
                </div>
                <DebounceInput
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  onChange={(event) =>
                    onChange(event.target.name, event.target.value)
                  }
                  value={user.newPassword || ""}
                  className="form-control"
                  debounceTimeout={300}
                />
              </Col>
            </Row>
            <Row className="mb-1">
              <Col xs="6">
                <div className="my-1">
                  Retype Password {helpers.requiredStar()}
                </div>
                <DebounceInput
                  type="password"
                  name="newPasswordAgain"
                  id="newPasswordAgain"
                  onChange={(event) =>
                    onChange(event.target.name, event.target.value)
                  }
                  value={user.newPasswordAgain || ""}
                  className="form-control"
                  debounceTimeout={300}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="6" className="mt-2 text-right">
                <Button
                  className="projectPrimary"
                  onClick={() => onUpdatePassword()}
                  size="lg"
                >
                  Update Password
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </TabPane>
    </TabContent>
  );
  return (
    <Media>
      {({ breakpoints, currentBreakpoint }) => {
        if (breakpoints[currentBreakpoint] > breakpoints.smallDesktop) {
          return (
            <Fragment>
              {message ? (
                <Alert color={message.flavor}>{message.text}</Alert>
              ) : null}
              <Row className="px-4">
                <Col xs="2" className="mx-0 px-0">
                  <Nav vertical pills>
                    {navLinks}
                  </Nav>
                </Col>
                <Col xs="8">{tabContent}</Col>
              </Row>
            </Fragment>
          );
        }
        return (
          <Fragment>
            {message ? (
              <Alert color={message.flavor}>{message.text}</Alert>
            ) : null}
            <Row className="mb-1 px-1">
              <Col xs="12" className="mx-0 px-0">
                <Nav pills>{navLinks}</Nav>
              </Col>
            </Row>
            <Row className="px-1">
              <Col xs="12" className="mx-0 px-0">
                {tabContent}
              </Col>
            </Row>
          </Fragment>
        );
      }}
    </Media>
  );
}
