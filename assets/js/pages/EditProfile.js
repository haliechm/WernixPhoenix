import React, { useState } from "react";
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

export default function EditProfile(props) {
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
            <Label>First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="user_first_name"
              // LATER CHANGE THE PLACEHOLDER TO BE THE REAL USERS FIRST NAME
              placeholder="your first name"
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
            <Label>Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="user_last_name"
              // LATER CHANGE THE PLACEHOLDER TO BE THE REAL USERS FIRST NAME
              placeholder="your last name"
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
                placeholder="your username"
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
              placeholder="your email"
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
