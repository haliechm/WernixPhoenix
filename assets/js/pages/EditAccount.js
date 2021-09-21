import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Form, Button, Label, Input } from "reactstrap";
import { PopUpModal } from "./";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function EditAccount(props) {
  const userCtx = useContext(UserContext);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [action, setAction] = useState("");

  return (
    <Fragment>
      <PopUpModal
        popUpModalOpen={popUpModalOpen}
        setPopUpModalOpen={setPopUpModalOpen}
        action={action}
      />
      <Form>
        <Row>
          <Col
            className="register-form-label"
            md={{ size: 8, offset: 0 }}
            xs={{ size: 10, offset: 0 }}
          >
            <div className="edit-field">
              {/* MUST CHANGE THIS DEPENDING ON IF ALREADY SHOWING OR HIDING */}
              <Link
                onClick={() => {
                  setPopUpModalOpen(!popUpModalOpen);
                  setAction("Hide Profile");
                }}
              >
                Hide profile from other users
              </Link>
            </div>
            <div className="edit-field">
              <Link
                onClick={() => {
                  setPopUpModalOpen(!popUpModalOpen);
                  setAction("Delete Account");
                }}
              >
                Delete account
              </Link>
            </div>
            <div className="edit-field">
              <Link
                onClick={() => {
                  setPopUpModalOpen(!popUpModalOpen);
                  setAction("Logout");
                }}
              >
                Logout
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
}
