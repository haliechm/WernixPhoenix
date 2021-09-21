import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Label, Input, Form, Button } from "reactstrap";
import { PopUpModal } from "./";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function EditPassword(props) {
  const userCtx = useContext(UserContext);
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [reenterPasswordShown, setReenterPasswordShown] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  return (
    <Form>
      <PopUpModal
        popUpModalOpen={popUpModalOpen}
        setPopUpModalOpen={setPopUpModalOpen}
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
                name="password"
                id="user_password"
                placeholder="your old password"
                bsSize="sm"
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
                name="password"
                id="user_password"
                placeholder="your new password"
                bsSize="sm"
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
                name="password"
                id="user_password"
                placeholder="re-enter your password"
                bsSize="sm"
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
