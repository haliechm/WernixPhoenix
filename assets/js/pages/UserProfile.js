import React, { useState, useEffect, useContext, Fragment } from "react";
import { NavBarSignedIn, UserProfileTop, Friends, UserModal, Footer } from "./";
import { Container, Row, Col } from "reactstrap";
import { chat_history } from "../../images";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

const defaultNewUser = {
  id: 0,
  // roles: [],
};

export default function UserProfile(props) {
  const userCtx = useContext(UserContext);
  // const [user, setUser] = useState(defaultNewUser);
  const [usernameChosen, setUsernameChosen] = useState(""); // username of friends
  const [userModalOpen, setUserModalOpen] = useState(false); // friends modal (userModal)

  // const routeUserId = props?.computedMatch?.params?.id
  //   ? parseInt(props.computedMatch.params.id, 10)
  //   : null;
  // const isNewUser = !routeUserId;
  // const currentUser = userCtx?.currentUser ? userCtx.currentUser : null;

  // useEffect(() => {
  //   setUserModalOpen(!userModalOpen);
  //   console.log(`new username: ${usernameChosen}`)
  //   console.log(`value of userModal: ${userModalOpen}`)
  // }, [usernameChosen])

  // useEffect(() => {
  //   // console.log("THE USER CONTEXT!!!!!!!!!!!!!!!!!!!!!!!!!!!", userCtx);
  //   // console.log("CURRENT USER OF CONTEXT!!!!!!!!!!", userCtx.currentUser);
  //   if (routeUserId) {
  //     api
  //       // fetch is getting user from table in response
  //       .fetch(`admin/user/${routeUserId}`)
  //       .then((response) => {
  //         if (response.data) {
  //           let existingUser = response.data;

  //           setUser(existingUser);
  //           // now user is entire record from User table
  //         }
  //       })
  //       .catch((error) =>
  //         setMessage({
  //           flavor: "danger",
  //           text: "There was an error loading user data",
  //         })
  //       );
  //   }
  // }, []);

  return (
    <Fragment>
      <NavBarSignedIn setRedirectTo={props.setRedirectTo}/>
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
