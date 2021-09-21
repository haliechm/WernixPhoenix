import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Label, Input, Form, Button, FormGroup } from "reactstrap";
import { PopUpModal } from "./";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function EditLanguage(props) {
  const userCtx = useContext(UserContext);
  // CHANGE THIS TO BE DEFAULTED BASED ON WHOEVER IS LOGGED ON
  const [learningLanguage, setLearningLanguage] = useState("Russian");
  const [nativeLanguage, setNativeLanguage] = useState("English");
  const [userSkillLevel, setUserSkillLevel] = useState("___________");
  const [othersSkillLevel, setOthersSkillLevel] = useState("___________");
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
            <Label>Native Language</Label>
            <div className="pass-wrapper">
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={(e) =>
                  setNativeLanguage(
                    e.target.options[e.target.selectedIndex].text
                  )
                }
              >
                <option>English</option>
                <option>German</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Italian</option>
                <option>Russian</option>
                <option>Swahili</option>
              </Input>
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
            <Label>Learning Language</Label>
            <div className="pass-wrapper">
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                onChange={(e) =>
                  setLearningLanguage(
                    e.target.options[e.target.selectedIndex].text
                  )
                }
              >
                <option>English</option>
                <option>German</option>
                <option>French</option>
                <option>Spanish</option>
                <option>Italian</option>
                <option>Russian</option>
                <option>Swahili</option>
              </Input>
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
            <Label>My skill level in {learningLanguage}:</Label>
            <Form>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="newbie"
                    value="newbie"
                    checked={userSkillLevel == "newbie"}
                    onChange={(e) => setUserSkillLevel(e.target.value)}
                  />{" "}
                  newbie
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="beginner"
                    value="beginner"
                    checked={userSkillLevel == "beginner"}
                    onChange={(e) => setUserSkillLevel(e.target.value)}
                  />{" "}
                  beginner
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    color="default"
                    name="others_skill_level"
                    id="intermediate"
                    value="intermediate"
                    checked={userSkillLevel == "intermediate"}
                    onChange={(e) => setUserSkillLevel(e.target.value)}
                  />{" "}
                  intermediate
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="advanced"
                    value="advanced"
                    checked={userSkillLevel == "advanced"}
                    onChange={(e) => setUserSkillLevel(e.target.value)}
                  />{" "}
                  advanced
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="expert"
                    value="expert"
                    checked={userSkillLevel == "expert"}
                    onChange={(e) => setUserSkillLevel(e.target.value)}
                  />{" "}
                  expert
                </Label>
              </FormGroup>
            </Form>
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
            <Label>
              I prefer to match with people that are <b>{othersSkillLevel}</b>{" "}
              in {nativeLanguage}:
            </Label>
            <Form>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="newbie"
                    value="newbies"
                    checked={othersSkillLevel == "newbies"}
                    onChange={(e) => setOthersSkillLevel(e.target.value)}
                  />{" "}
                  newbies
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="beginner"
                    value="beginners"
                    checked={othersSkillLevel == "beginners"}
                    onChange={(e) => setOthersSkillLevel(e.target.value)}
                  />{" "}
                  beginners
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    color="default"
                    name="others_skill_level"
                    id="intermediate"
                    value="intermediate"
                    checked={othersSkillLevel == "intermediate"}
                    onChange={(e) => setOthersSkillLevel(e.target.value)}
                  />{" "}
                  intermediate
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="advanced"
                    value="advanced"
                    checked={othersSkillLevel == "advanced"}
                    onChange={(e) => setOthersSkillLevel(e.target.value)}
                  />{" "}
                  advanced
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="radio"
                    name="others_skill_level"
                    id="expert"
                    value="experts"
                    checked={othersSkillLevel == "experts"}
                    onChange={(e) => setOthersSkillLevel(e.target.value)}
                  />{" "}
                  experts
                </Label>
              </FormGroup>
            </Form>
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
