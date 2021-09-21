import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Label,
  Input,
  Form,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { PopUpModal } from "./";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function EditProfile(props) {
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState(userCtx.currentUser);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

  // NEED TO ACTUALLY CHANGE USER CONTEXT AT SOME POINT

  // does this useEffect() really do anything? i feel like it's not
  useEffect(() => {
    console.log("USER CONTEXT FIRST:::::::::::::", userCtx);
    setUser(userCtx.currentUser);
    console.log("USER CONTEXT:::::::::::::", userCtx);
    // adding this to try to get the context to stay the same
    // userCtx.changeCurrentUser(userCtx.currentUser);
  }, [userCtx.currentUser]);

  useEffect(() => {
    if (saveChanges) {
      console.log("11111111111111111111111111 GETTING HERE");
      saveProfileChanges();
    }
  }, [saveChanges]);

  function onChange(fieldName, fieldValue) {
    let newUser = Object.assign({}, user);
    // console.log("NEW USER: ", newUser);
    newUser[fieldName] = fieldValue;
    setUser(newUser);
  }

  function saveProfileChanges() {
    // let warnings = [];
    // if (!user.first_name || _.trim(user.first_name).length < 2) {
    //   warnings.push("Please provide a valid first name.");
    // }
    // if (!user.last_name || _.trim(user.last_name).length < 2) {
    //   warnings.push("Please provide a valid last name.");
    // }
    // if (!user.username || _.trim(user.username).length < 2) {
    //   warnings.push("Please provide a username.");
    // }
    // if (!user.mobile_number || _.trim(user.mobile_number).length < 2) {
    //   warnings.push("Please provide a mobile #.");
    // }
    // if (!user.email || !helpers.emailIsValid(user.email)) {
    //   warnings.push("Please provide a valid email.");
    // }
    // if (warnings.length) {
    //   setMessage({
    //     text: warnings.join(" "),
    //     flavor: "danger",
    //   });
    //   return;
    // } else {
    //   setMessage(null);
    // }
    let payload = new FormData();
    payload.append("id", user.id);
    payload.append("first_name", user.first_name);
    payload.append("middle_name", user.middle_name);
    payload.append("last_name", user.last_name);
    payload.append("email", user.email);
    payload.append("mobile_number", user.mobile_number);
    payload.append("username", user.username);
    // if (profilePicture) {
    //   payload.append("image_url", profilePicture);
    // }
    api
      .post_form_data("save_profile", payload)
      .then((response) => {
        // THIS RIGHT HERE IS CAUSING THE MEMORY LEAK
        // SO SAYS IT'S BECAUSE WE ARE SETTING THAT STATE AFTER THE COMPONENT MIGHT HAVE UNMOUNTED
        setSaveChanges(false);
        if (response.data.success) {
          console.log("getting hereeeeeeeee");
          setTimeout(() => userCtx.signIn(user), 500);
          // if (response.data.image_url) {
          //   user.image_url = response.data.image_url;
          //   userCtx.addPhotoToUser(response.data.image_url);
          // }
          // setMessage({
          //   text: "Your profile has been updated successfully!",
          //   flavor: "success",
          // });
          //   setTimeout(() => userCtx.signIn(user), 3000);
          // } else {
          //   setMessage({ text: response.data.message, flavor: "danger" });
        }
      })
      .catch(helpers.catchHandler);
  }

  return (
    <Form>
      <PopUpModal
        popUpModalOpen={popUpModalOpen}
        setPopUpModalOpen={setPopUpModalOpen}
        setSaveChanges={setSaveChanges}
        action="Save Changes"
      />
      <Row>
        <Col
          className="register-form-label"
          md={{ size: 8, offset: 0 }}
          xs={{ size: 10, offset: 0 }}
        >
          <div className="edit-field">
            <Label>First Name</Label>
            <Input
              type="text"
              name="first_name" // this is important!!! name MUST be field name of user object (which is user context)
              id="user_first_name"
              // LATER CHANGE THE PLACEHOLDER TO BE THE REAL USERS FIRST NAME
              // placeholder={
              //   userCtx.currentUser
              //     ? userCtx.currentUser.first_name
              //     : "your first name"
              // }
              onChange={(event) =>
                onChange(event.target.name, event.target.value)
              }
              bsSize="sm"
              value={user.first_name || ""}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className="register-form-label"
          md={{ size: 8, offset: 0 }}
          xs={{ size: 10, offset: 0 }}
        >
          <div className="edit-field">
            <Label>Last Name</Label>
            <Input
              type="text"
              name="last_name"
              id="user_last_name"
              // LATER CHANGE THE PLACEHOLDER TO BE THE REAL USERS FIRST NAME
              // placeholder={
              //   userCtx.currentUser
              //     ? userCtx.currentUser.last_name
              //     : "your last name"
              // }
              onChange={(event) =>
                onChange(event.target.name, event.target.value)
              }
              value={user.last_name || ""}
              bsSize="sm"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className="register-form-label"
          md={{ size: 8, offset: 0 }}
          xs={{ size: 10, offset: 0 }}
        >
          <div className="edit-field">
            <Label>Username</Label>
            <InputGroup size="sm">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input
                type="text"
                name="username"
                id="user_username"
                // placeholder={
                //   userCtx.currentUser
                //     ? userCtx.currentUser.username
                //     : "your username"
                // }
                onChange={(event) =>
                  onChange(event.target.name, event.target.value)
                }
                value={user.username || ""}
                bsSize="sm"
              />
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className="register-form-label"
          md={{ size: 8, offset: 0 }}
          xs={{ size: 10, offset: 0 }}
        >
          <div className="edit-field">
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              id="user_email"
              // LATER CHANGE THE PLACEHOLDER TO BE THE REAL USERS FIRST NAME
              // placeholder={
              //   userCtx.currentUser ? userCtx.currentUser.email : "your email"
              // }
              onChange={(event) =>
                onChange(event.target.name, event.target.value)
              }
              value={user.email || ""}
              bsSize="sm"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className="register-form-label"
          md={{ size: 8, offset: 0 }}
          xs={{ size: 10, offset: 0 }}
        >
          <div className="edit-field">
            <Label>Birthdate</Label>
            <Input
              type="text"
              name="birthdate"
              id="user_birthdate"
              // LATER CHANGE THE PLACEHOLDER TO BE THE REAL USERS FIRST NAME
              placeholder="MM/DD/YYYY"
              bsSize="sm"
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          className="register-form-label"
          md={{ size: 8, offset: 0 }}
          xs={{ size: 10, offset: 0 }}
        >
          <div className="edit-field">
            <Button
              onClick={() => setPopUpModalOpen(!popUpModalOpen)}
              // onClick={onSubmit}
              style={{ backgroundColor: "#476b55" }}
            >
              Save Changes
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
}
