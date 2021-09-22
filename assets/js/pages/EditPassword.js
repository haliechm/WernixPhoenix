import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Label, Input, Form, Button } from "reactstrap";
import { PopUpModal } from "./";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function EditPassword(props) {
  const userCtx = useContext(UserContext);
  const [user, setUser] = useState(userCtx.currentUser);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [reenterPasswordShown, setReenterPasswordShown] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    setUser(userCtx.currentUser);
  }, [userCtx.currentUser]);

  useEffect(() => {
    if (saveChanges) {
      savePasswordChanges();
    }
  }, [saveChanges]);

  function onChange(fieldName, fieldValue) {
    let newUser = Object.assign({}, user);
    newUser[fieldName] = fieldValue;
    setUser(newUser);
  }

  function savePasswordChanges() {
    //  let warnings = [];
    //  if (!user.newPassword || _.trim(user.newPassword).length < 8) {
    //    warnings.push(
    //      "Please provide a valid, new password of at least 8 characters."
    //    );
    //  }
    //  if (!user.oldPassword || _.trim(user.oldPassword).length < 8) {
    //    warnings.push(
    //      "Please provide a valid, existing password of at least 8 characters."
    //    );
    //  }
    //  if (!user.newPasswordAgain || _.trim(user.newPasswordAgain).length < 8) {
    //    warnings.push("Please provide your valid, new password a second time.");
    //  }
    //  if (user.newPassword !== user.newPasswordAgain) {
    //    warnings.push(
    //      "Your new password and password confirmation do not match."
    //    );
    //  }
    //  if (user.newPassword === user.oldPassword) {
    //    warnings.push("Your new password and old password must be different.");
    //  }
    //  if (warnings.length) {
    //    setMessage({
    //      text: warnings.join(" "),
    //      flavor: "danger",
    //    });
    //    return;
    //  } else {
    //    setMessage(null);
    //  }
    api
      .post("update_password", {
        password: user.newPassword,
        old_password: user.oldPassword,
      })
      .then((response) => {
        if (response.data.success) {
          //  setMessage({
          //    text: "Your password has been updated successfully!",
          //    flavor: "success",
          //  });
          console.log("I THINK PASSWORD CHANGED CORRECTLY");
          setUser({
            ...user,
            oldPassword: "",
            newPassword: "",
            newPasswordAgain: "",
          });
        } else {
          console.log("SOMETHING WENT WRONG");
          //  setMessage({ text: response.data.message, flavor: "danger" });
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
            <Label>Old Password</Label>
            <div className="pass-wrapper">
              <Input
                type={oldPasswordShown ? "text" : "password"}
                name="oldPassword"
                id="user_password"
                // placeholder="your old password"
                value={user.oldPassword || ""}
                bsSize="sm"
                onChange={(event) =>
                  onChange(event.target.name, event.target.value)
                }
              />
              <i
                onClick={() => setOldPasswordShown(!oldPasswordShown)}
                className={
                  oldPasswordShown
                    ? "fas fa-eye-slash eyeball"
                    : "fas fa-eye eyeball"
                }
              ></i>
            </div>
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
            <Label>New Password</Label>
            <div className="pass-wrapper">
              <Input
                type={passwordShown ? "text" : "password"}
                name="newPassword"
                id="user_password"
                // placeholder="your new password"
                value={user.newPassword || ""}
                bsSize="sm"
                onChange={(event) =>
                  onChange(event.target.name, event.target.value)
                }
              />
              <i
                onClick={() => setPasswordShown(!passwordShown)}
                className={
                  passwordShown
                    ? "fas fa-eye-slash eyeball"
                    : "fas fa-eye eyeball"
                }
              ></i>
            </div>
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
            <Label>Re-enter New Password</Label>
            <div className="pass-wrapper">
              <Input
                type={reenterPasswordShown ? "text" : "password"}
                name="newPasswordAgain"
                id="user_password"
                // placeholder="re-enter your password"
                value={user.newPasswordAgain || ""}
                bsSize="sm"
                onChange={(event) =>
                  onChange(event.target.name, event.target.value)
                }
              />
              <i
                onClick={() => setReenterPasswordShown(!reenterPasswordShown)}
                className={
                  reenterPasswordShown
                    ? "fas fa-eye-slash eyeball"
                    : "fas fa-eye eyeball"
                }
              ></i>
            </div>
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
