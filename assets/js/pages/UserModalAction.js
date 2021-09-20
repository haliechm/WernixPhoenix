import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";

export default function UserModalAction(props) {
  return (
    <Modal
      isOpen={props.nestedModalOpen}
      toggle={props.toggleBothModals}
      centered
    >
      <ModalHeader>
        {props.userBlocked
          ? "Block @Vladimir_1917?"
          : "Unfriend @Vladimir_1917?"}
      </ModalHeader>
      {/* <ModalBody>Stuff and things</ModalBody> */}
      <ModalFooter>
        <Button color="danger" onClick={props.toggleBothModals}>
          {props.userBlocked ? "Block" : "Unfriend"}
        </Button>
        <Button
          color="secondary"
          onClick={() => props.setNestedModalOpen(false)}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
