import React, { Fragment, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Media } from "react-breakpoints";
import {
  Container,
  Card,
  CardBody,
  Col,
  Button,
  Row,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  ButtonGroup,
  Alert as Alert2,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "react-s-alert";
import Logo from "../../images/logo.png";
import { contexts, api } from "../utils";
const { UserContext } = contexts;

export default function Layout(props) {
  const userCtx = useContext(UserContext);
  const [collapse, setCollapse] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function logout() {
    api
      .post("log_out")
      .then((response) => {
        userCtx.signOut();
      })
      .catch((error) => {
        console.error(error);
        userCtx.signOut();
        Alert.error("There was an error logging out");
      });
  }

  const user = userCtx.currentUser;
  if (userCtx.fullScreenDashboard) {
    return (
      <Container fluid className="desktopContainer px-1">
        <Row className="m-0 p-0 fullHeight">
          <Col className="m-0 p-0">{props.children}</Col>
        </Row>
      </Container>
    );
  }
  const navLinksCollapse = (
    <Collapse isOpen={collapse} navbar>
      {user ? (
        <Nav className="ml-auto navText" navbar>
          <NavItem>
            <NavLink tag={Link} to="/home" className={user.image_url && "pt-1"}>
              Dashboard
            </NavLink>
          </NavItem>
          {user.is_admin && (
            <NavItem>
              <NavLink tag={Link} to="/admin" className={user.image_url && "pt-1"}>
                Administration
              </NavLink>
            </NavItem>
          )}
          <UncontrolledDropdown nav inNavbar >
            <DropdownToggle nav caret className={user.image_url && "pt-0"}>
              {user.image_url ?
                <img src={user.image_url} className="profileImage mr-2" />
                : <FontAwesomeIcon icon="user" className="mr-2" />
              }
              {`${user.first_name} ${user.last_name}`}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem tag={Link} to="/profile">
                My Profile
              </DropdownItem>
              {user.is_admin || userCtx.impersonating ? (
                <Fragment>
                  {userCtx.impersonating ? (
                    <Fragment>
                      <DropdownItem divider />
                      <DropdownItem
                        onClick={() =>
                          userCtx.clearImpersonation()
                        }
                      >
                        Stop Impersonating
                      </DropdownItem>
                    </Fragment>
                  ) : null}
                </Fragment>
              ) : null}
              <DropdownItem divider />
              <DropdownItem onClick={logout}>
                Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      ) : null}
    </Collapse>
  );
  return (
    <Media>
      {({ breakpoints, currentBreakpoint }) => {
        switch (currentBreakpoint) {
          case breakpoints.mobile:
            return (
              <Container fluid className="desktopContainer px-1">
                <Row className="m-0 p-0 fullHeight ">
                  <Col className="m-0 p0">
                    <Row className="m-0 px-1">
                      <Col xs="12" className="my-1 p-0">
                        <Navbar expand="md" className="pt-0 pb-0 justify-content-center" id="header">
                          <NavbarBrand tag={Link} to="/home">
                            <img
                              src={Logo}
                              className="headerLogo navBranding"
                              alt="logo"
                            />
                          </NavbarBrand>
                          <NavbarToggler
                            className="navbar-toggler navbar-toggler-right pb-0"
                            onClick={() => setCollapse(!collapse)}
                          >
                            <span className="navbar-toggler-icon pb-0">
                              <FontAwesomeIcon icon="bars" />
                            </span>
                          </NavbarToggler>
                          {navLinksCollapse}
                        </Navbar>
                      </Col>
                    </Row>
                    <Row className="m-0 p-0 fullHeight">
                      <Col className="m-0 p-0 p-2">{props.children}</Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            )
          case breakpoints.desktop:
          default:
            return (
              <Container fluid className="desktopContainer px-1">
                <Row className="m-0 p-0 fullHeight ">
                  <Col className="m-0 px-1 py-0">
                    <Row className="m-0 px-1">
                      <Col xs="12" className="my-2 p-0">
                        <Navbar expand="md" className="pt-0 pb-0" id="header">
                          <NavbarBrand tag={Link} to="/home">
                            <img
                              src={Logo}
                              className="headerLogo navBranding"
                              alt="logo"
                            />
                          </NavbarBrand>
                          <NavbarToggler
                            className="navbar-toggler navbar-toggler-right pb-0"
                            onClick={() => setCollapse(!collapse)}
                          >
                            <span className="navbar-toggler-icon pb-0">
                              <FontAwesomeIcon icon="bars" />
                            </span>
                          </NavbarToggler>
                          {navLinksCollapse}
                        </Navbar>
                      </Col>
                    </Row>
                    <Row className="m-0 p-0 fullHeight">
                      <Col className="m-0 p-0 p-2">{props.children}</Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            );
        }
      }}
    </Media>
  );
}
