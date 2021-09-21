import React, { useState, Fragment } from "react";
import { UserModalAction } from "./";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

export default function UserModal(props) {
  const [nestedModalOpen, setNestedModalOpen] = useState(false);
  const [userBlocked, setUserBlocked] = useState(false);

  const toggle = () => props.setUserModalOpen(!props.userModalOpen);
  const toggleBothModals = () => {
    console.log("getting right here!!!!");
    setNestedModalOpen(!nestedModalOpen);
    toggle();
  };
  return (
    <div>
      <Modal
        isOpen={props.userModalOpen}
        toggle={toggle}
        centered
        style={{ textAlign: "center" }}

        // className="modal-dialog"
      >
        <ModalHeader toggle={toggle}>
          {/* CHANGE THIS BASED IF THEY ARE ONLINE OR OFFLINE */}
          <i class="fas fa-circle online mr-2"></i>
          <b>{props.usernameChosen}</b>
        </ModalHeader>
        <ModalBody className="modal-body">
          <UserModalAction
            nestedModalOpen={nestedModalOpen}
            setNestedModalOpen={setNestedModalOpen}
            toggleBothModals={toggleBothModals}
            userBlocked={userBlocked}
          />
          <p>
            Native
            Language:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Russian
          </p>
          <p>Learning Language:&nbsp;&nbsp;&nbsp;&nbsp;English</p>
          <hr />
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              <Button
                className="user-modal-button mt-5"
                style={{ backgroundColor: "#476b55" }}
              >
                Send Chat
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              {/* DISABLE THIS IF USER IS NOT ONLINE */}
              <Button
                className="user-modal-button"
                style={{ backgroundColor: "#8ad1a6" }}
              >
                Request Video Message
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setNestedModalOpen(!nestedModalOpen);
              setUserBlocked(true);
            }}
          >
            Block
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setNestedModalOpen(!nestedModalOpen);
              setUserBlocked(false);
            }}
          >
            Unfriend
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
