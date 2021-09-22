import React, { useState, useContext, Fragment } from "react";
import {
  NavBarSignedIn,
  UserProfileTop,
  SettingsSideBar,
  EditAccount,
  EditLanguage,
  EditPassword,
  EditProfile,
  Footer,
} from "./";
import { Container, Row, Col } from "reactstrap";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function Settings(props) {
  const userCtx = useContext(UserContext);
  const [chosenToEdit, setChosenToEdit] = useState("PROFILE");
  return (
    <Fragment>
      <NavBarSignedIn setRedirectTo={props.setRedirectTo} />
      <UserProfileTop />
      <Container className="no-padding mb-0 pb-0 profile-top" fluid>
        <Row>
          <Col
            md={{ size: 4, offset: 1 }}
            //   xs={{ size: 4, offset: 0 }}
            className="no-padding py-2 mb-2"
          >
            <h5 className="profile-header">EDIT INFO</h5>
            <SettingsSideBar
              chosenToEdit={chosenToEdit}
              setChosenToEdit={setChosenToEdit}
            />
          </Col>
          <Col className="no-padding py-2 mb-2">
            <h5 className="profile-header">{`${chosenToEdit} SETTINGS`}</h5>
            {/* choose between profile, password, language, or account setttings: */}
            {chosenToEdit == "PROFILE" ? (
              <EditProfile />
            ) : chosenToEdit == "PASSWORD" ? (
              <EditPassword />
            ) : chosenToEdit == "LANGUAGE" ? (
              <EditLanguage />
            ) : (
              <EditAccount />
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </Fragment>
  );
}
