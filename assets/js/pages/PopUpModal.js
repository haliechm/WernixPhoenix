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

export default function PopUpModal(props) {
  return (
    <Modal
      isOpen={props.popUpModalOpen}
      toggle={props.setPopUpModalOpen}
      centered
    >
      <ModalHeader>Are you sure you want to {props.action}?</ModalHeader>
      {/* <ModalBody>Stuff and things</ModalBody> */}
      <ModalFooter>
        <Button
          style={{ backgroundColor: "#476b55" }}
          onClick={() => {props.setSaveChanges(true); props.setPopUpModalOpen(false)}}
        >
          {props.action}
        </Button>
        <Button
          color="secondary"
          onClick={() => {props.setSaveChanges(false); props.setPopUpModalOpen(false)}}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
