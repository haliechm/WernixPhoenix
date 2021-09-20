import React, { useState, useEffect, Fragment } from "react";
import { NavBarSignedIn, UserProfileTop, Friends, UserModal, Footer } from "./";
import { Container, Row, Col } from "reactstrap";
import { chat_history } from "../../images";

export default function UserProfile(props) {
  const [usernameChosen, setUsernameChosen] = useState("");
  const [userModalOpen, setUserModalOpen] = useState(false);

  // useEffect(() => {
  //   setUserModalOpen(!userModalOpen);
  //   console.log(`new username: ${usernameChosen}`)
  //   console.log(`value of userModal: ${userModalOpen}`)
  // }, [usernameChosen])

  return (
    <Fragment>
      <NavBarSignedIn />
      <UserProfileTop />
      <Container className="no-padding mb-0 pb-0 profile-top" fluid>
        <Row className="my-1 mr-1 profile-page-background">
          <Col
            md={{ size: 4, offset: 1 }}
            //   xs={{ size: 4, offset: 0 }}
            className="no-padding"
          >
            <Row>
              <Col>
                <h5 className="profile-header">FRIENDS</h5>
                <Friends
                  setUsernameChosen={setUsernameChosen}
                  setUserModalOpen={setUserModalOpen}
                  userModalOpen={userModalOpen}
                />
              </Col>
            </Row>
            <Row className="py-4">
              <Col>
                <h5 className="profile-header">LANGUAGE INFO</h5>
                <div id="language-info">
                  <p>
                    <b>native language:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{" "}
                    English
                  </p>
                  <p>
                    <b>learning language:&nbsp;&nbsp;</b> Russian
                  </p>
                </div>
              </Col>
            </Row>
          </Col>

          <Col
            md={{ size: 7, offset: 0 }}
            //   xs={{ size: 4, offset: 0 }}
            className="no-padding"
          >
            <h5 className="profile-header">CHAT HISTORY</h5>
            <img
              src={chat_history}
              width="76%"
              alt="chat history image example"
              style={{ paddingTop: "15px" }}
            ></img>
          </Col>
        </Row>
      </Container>
      <Footer />
      <UserModal
        userModalOpen={userModalOpen}
        setUserModalOpen={setUserModalOpen}
        usernameChosen={usernameChosen}
      />
    </Fragment>
  );
}
