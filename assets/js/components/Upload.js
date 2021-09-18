import React, { Component, Fragment } from "react";
import { Button, ButtonGroup, Card, CardHeader, CardBody, Col, Row, Container, CardTitle, CardText } from "reactstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { api } from "../utils";
import _ from "lodash";
import Dropzone from "react-dropzone";
import Alert from "react-s-alert";

const newDocument = {
  file: "",
  document_type: "",
  document_type_id: ""
}

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      newDocument: newDocument
    };

    this.onDrop = this.onDrop.bind(this);
    this.uploadDocument = this.uploadDocument.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  uploadDocument() {
    api.post("uploadDocument", {
      file: this.state.newDocument.file,
      document_type_id: this.state.newDocument.document_type_id,
      name: this.state.files[0].name,
      document_url: this.state.files[0].name,
      type: this.props.type
    }).then(response => {
        if (response.data.success) {
          this.setState({
            newDocument: newDocument,
            files: []
          }, this.props.reload);
        } else {
          Alert.error("There was an error uploading the file")
        }
      })
      .catch(error => {
        console.error(error);
        Alert.error("There was an error uploading the file", {
          timeout: 4000
        });
      });
  }

  onDrop(files) {
    let file = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        this.setState({
            ...this.state,
            newDocument: {
              ...this.state.newDocument,
              file: event.target.result
            },
            files: files
        });
    };
  }

  handleDocumentFormInput(value, field) {
    if (field === "document_type_id") {
      this.setState({
        newDocument: {
          ...this.state.newDocument,
          [field]: value.value,
          document_type: value
        }
      })
    } else {
      this.setState({
        newDocument: {
          ...this.state.newDocument,
          [field]: value
        }
      })
    }
  }

  removeFile(e, file) {
    e.preventDefault();
    const currentState = this.state.files;
    const files = _.filter(currentState, f => f.name !== file.name);
    this.setState({ files: files });
  }

  render() {
    return (
      <Fragment>
        <Row className="expand-md mt-2 mb-2 pb-0">
          <Col sm={this.state.files.length === 1 ? "6" : "12"}>
            <Card className="text-center">
              <CardBody>
                <CardTitle>
                  Drop files or click on the icon below
                </CardTitle>
                <div ref={this.dropZone}>
                  <Dropzone
                    className="col-xs-4"
                    onDrop={this.onDrop}
                    disabled={this.state.files.length === 1}
                    accept="application/pdf"
                  >
                      {dropzoneProps => {
                      return (
                        <div style={{ textAlign: "center" }}>
                          <FontAwesomeIcon icon="file-upload" size="6x" />
                        </div>
                      );
                    }}
                  </Dropzone>
                </div>
              </CardBody>
            </Card>
            <br />
            <CardText>
              {this.state.files.map(f => (
                <li key={f.name}>
                  <span>{f.name} </span>
                  <Button
                    className="l2Danger"
                    size="sm"
                    onClick={e => this.removeFile(e, f)}
                  >
                    <FontAwesomeIcon icon="trash-alt" />
                  </Button>
                </li>
              ))}
            </CardText>
          </Col>
          {this.state.files.length === 1 && (
            <Col sm="6">
              Document Type
              <Select
              options={this.props.document_types}
              onChange={e => this.handleDocumentFormInput(e, "document_type_id")}
              value={this.state.newDocument.document_type}
              />
            </Col>
          )}
        </Row>
      </Fragment>
    );
  }
}
