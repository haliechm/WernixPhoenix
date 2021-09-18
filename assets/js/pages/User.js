import React, { Fragment, useState, useContext, useEffect, useRef } from "react";
import { Link, Redirect } from 'react-router-dom';
import { Media } from "react-breakpoints";
import { Col, Button, Row, ButtonGroup, ListGroup, ListGroupItem, Card, CardTitle, CardHeader, CardBody, 
  Badge, Table, FormGroup, Label, Input, Alert } from "reactstrap";
import Select from "react-select";
import Dropzone from 'react-dropzone';
import DebounceInput from "react-debounce-input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";
import _ from "lodash";
import Switch from "react-switch";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

const roleGroupStyles = {
  alignItems: 'center',
  fontSize: 14,
  fontWeight: 'bold',
  textDecoration: 'underline',  
  margin: '2px 0 0 0'
};

const formatRoleGroupLabel = data => (
  <div style={roleGroupStyles}>
    <span>{data.label}</span>
  </div>
);

const resolveAvailableRoles = (currentUser) => {
  let roleList = constants.ALL_ROLES.slice();
  if (!_.includes(currentUser.roles, constants.ROLE_NAMES.SYSADMIN)) 
  {
    roleList = _.reject(roleList, r => r.value === constants.ROLE_IDS.SYSADMIN);
  }
  return _.sortBy(roleList, "label");
};

const groupRoleOptions = (roleList) => {
  // groups with 1 option each
  let groupedRoles = _.chain(roleList.slice())
    .groupBy(r => r.groupName)
    .toPairs()
    .map(kv => {
      return {
        label: kv[0],
        options: kv[1]
      };
    }).value();
  let filteredGroupedRoles = [];
  // consolidate all options under a single group    
  _.each(groupedRoles, g => {
    // if this group contains at least 1 role among those desired include it in the filtered output
    if (_.some(g.options, role => _.findIndex(roleList, r2 => r2.value === role.value) >= 0)) {
      // filter the contained roles to only those desired
      g.options = _.filter(g.options, role => _.findIndex(roleList, r2 => r2.value === role.value) >= 0);
      filteredGroupedRoles.push(g);
    }
  });
  return filteredGroupedRoles;
};

const defaultNewUser = {
  id: 0,
  roles: []
};
  
export default function User(props) {
  const userCtx = useContext(UserContext);
  const routeUserId = props?.computedMatch?.params?.id
    ? parseInt(props.computedMatch.params.id, 10)
    : null;
  const [user, setUser] = useState(defaultNewUser);
  const [userRoles, setUserRoles] = useState(user.roles || []);
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState(null);
  const [roleSelectionState, setRoleSelectionState] = useState(null);
  const [redirectTo, setRedirectTo] = useState("");
  // const [files, setFiles] = useState([]);
  const isNewUser = !routeUserId;
  const currentUser = userCtx?.currentUser
      ? userCtx.currentUser
      : null;
  const {current: availableRoles} = useRef(currentUser ? resolveAvailableRoles(currentUser) : []);

  useEffect(() => {
    if (routeUserId) {
      api.fetch(`admin/user/${routeUserId}`).then(response => {
        if (response.data) {
          let existingUser = response.data;
          existingUser.roles = _.map(existingUser.roles, roleName => {
            const roleObject = _.find(constants.ALL_ROLES, o => o.label === roleName);
            return {
              ...roleObject,
              role_id: roleObject.value
            };
          });
          setUser(existingUser);
        }
      }).catch(error => setMessage({flavor: "danger", text: "There was an error loading user data"}));
    }
  }, [])

  function onChange(fieldName, fieldValue) {
    let newUser = Object.assign({}, user);
    newUser[fieldName] = fieldValue;
    if (fieldName === 'email' && isNewUser) {
      newUser.username = fieldValue;
    }
    setUser(newUser);
  }

  function onRemoveRole(selectedRole) {
    let newUser = Object.assign({}, user);
    newUser.roles = _.reject(user.roles, r => r.role_id === selectedRole.role_id);
    setUser(newUser);
  }

  function onAddRole() {
    if (!roleSelectionState?.newRole?.typeSelection) {
      setMessage({flavor: "projectWarning", text: "Select a role type before attempting to add the role."});
      return;
    }
    if (roleSelectionState.newRole.typeSelection.value === constants.ROLE_IDS.SYSADMIN
      && _.some(user.roles, ur => ur.role_id === constants.ROLE_IDS.SYSADMIN)) 
    {
      setMessage({flavor: "projectWarning", text: 'The system administrator role has already been given.'});
      return;
    }
    let newUserRoles = user.roles.slice();
    let newUser = Object.assign({}, user);
    newUserRoles.push({
      role_id: roleSelectionState.newRole.typeSelection.value
    });
    newUser.roles = newUserRoles;
    setUser(newUser);
    setRoleSelectionState({
      ...roleSelectionState,
      newRole: {
        typeSelection: roleSelectionState.newRole.typeSelection
      }
    });
  }

  function onRoleSelectChange(fieldName, selection) {
    let newRoleState = {
      typeSelection: roleSelectionState?.newRole?.typeSelection
    };
    newRoleState[fieldName] = selection;
    setRoleSelectionState({
      newRole: newRoleState
    });
  }

  function validate() {
    let warnings = [];
    if (!user.first_name || _.trim(user.first_name).length < 2) {
      warnings.push('Please provide a valid first name.');
    }
    if (!user.last_name || _.trim(user.last_name).length < 2) {
      warnings.push('Please provide a valid last name.');
    }
    if (!user.username || _.trim(user.username).length < 2) {
      warnings.push('Please provide a username.');
    }
    if ((!user.password || user.password.length < 8) && user.id === 0) {
      warnings.push('Please provide a password of at least 8 characters.');
    }
    if (!user.email || !helpers.emailIsValid(user.email)) {
      warnings.push('Please provide a valid email.');
    }
    if (!user.roles || user.roles.length === 0) {
      warnings.push('Please select at least 1 role for the user.')
    }
    return warnings;
  }

  function onSave() {
    window.scroll(0, 0);
    const warnings = validate();
    if (warnings.length) {
      setMessage({
        text: warnings.join(' '),
        flavor: 'danger'
      });
      return;
    } else {
      setMessage(null);
    }
    let payload = Object.assign({}, user);
    payload.roles = _.map(payload.roles, r => (r.role_id));
    api.post('admin/user', payload).then(response => {
      if (response.data.success) {
        setRedirectTo("/users");
      } else {
        setMessage({text: response.data.message, flavor: "danger"});
      }
    }).catch(helpers.catchHandler);
  }

  const newSelectedRole = roleSelectionState?.newRole?.typeSelection
    ? _.find(constants.roles, r => r.value === roleSelectionState.newRole.typeSelection.value)
    : null;
  let newSelectedRoleContextDescription = null;
  const fullName = user?.last_name ? `${user.first_name} ${user.last_name}` : 'User';
  if (redirectTo) {
    return (<Redirect to="/users" />)
  }
  return (
    <Media>
      {({ breakpoints, currentBreakpoint }) => {
        switch (currentBreakpoint) {
          case breakpoints.mobile:
            return <div>{props.children}</div>;
          case breakpoints.desktop:
          default:
            return (
            <Fragment>
              <Card className="m-2 pb-0">
                <CardTitle className="mt-3 ml-3 mb-0">
                  <Row className="expand-md mt-2 mb-0 pb-0">
                    <Col><h3 className="primaryText">Edit {fullName}</h3></Col>
                  </Row>
                </CardTitle>
                <CardBody className="mb-0 py-1">
                {message
                  ? (<Alert className={message.flavor}>{message.text}</Alert>)
                  : null
                }
                <Row className="mb-3">
                  <Col xs="8">
                    <Card>
                      <CardBody>
                        <Row className="mb-1">
                          <Col xs="3">First Name {helpers.requiredStar()}
                            <DebounceInput
                              type="text"
                              name="first_name"
                              id="first_name"
                              maxLength="35"
                              onChange={(event) => onChange(event.target.name, event.target.value)}
                              value={user.first_name || ""}
                              className="form-control"
                              debounceTimeout={300}
                            />
                          </Col>
                          <Col xs="3">Middle Name
                            <DebounceInput
                              type="text"
                              name="middle_name"
                              id="middle_name"
                              maxLength="35"
                              onChange={(event) => onChange(event.target.name, event.target.value)}
                              value={user.middle_name || ""}
                              className="form-control"
                              debounceTimeout={300}
                            />
                          </Col>
                          <Col xs="3">Last Name {helpers.requiredStar()}
                            <DebounceInput
                              type="text"
                              name="last_name"
                              id="last_name"
                              maxLength="35"
                              onChange={(event) => onChange(event.target.name, event.target.value)}
                              value={user.last_name || ""}
                              className="form-control"
                              debounceTimeout={300}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col xs="3">Mobile Phone #
                            <DebounceInput
                              type="text"
                              name="mobile_number"
                              id="mobile_number"
                              maxLength="15"
                              onChange={(event) => onChange(event.target.name, event.target.value)}
                              value={user.mobile_number || ""}
                              className="form-control"
                              debounceTimeout={300}
                            />
                          </Col>
                          {isNewUser
                            ? (<Col xs="3">Password {helpers.requiredStar()}
                                <DebounceInput
                                  type="password"
                                  name="password"
                                  id="password"
                                  maxLength="30"
                                  onChange={(event) => onChange(event.target.name, event.target.value)}
                                  value={user.password || ""}
                                  className="form-control"
                                  debounceTimeout={300}
                                />
                              </Col>)
                            : null
                          }
                        </Row>
                        <Row className="mb-1">
                          <Col xs="6">Email {helpers.requiredStar()}
                            <DebounceInput
                              type="text" 
                              name="email"
                              id="email"
                              maxLength="150"
                              onChange={(event) => onChange(event.target.name, event.target.value)}
                              value={user.email || ""}
                              className="form-control"
                              debounceTimeout={300}
                            />
                          </Col>
                          <Col xs="6">Username {helpers.requiredStar()}
                            <DebounceInput
                              type="text"
                              name="username"
                              id="username"
                              maxLength="150"
                              onChange={(event) => onChange(event.target.name, event.target.value)}
                              value={user.username || ""}
                              className="form-control"
                              debounceTimeout={300}
                            />
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <Card>
                      <CardHeader>
                        <Row>
                          <Col>
                            <h5>Adjust {fullName} Roles</h5>
                          </Col>
                        </Row>
                      </CardHeader>
                      <CardBody>
                        <Row className="pt-3">
                          <Col>
                            <Label>Roles</Label>
                            <Select
                              options={groupRoleOptions(availableRoles)}
                              formatGroupLabel={formatRoleGroupLabel}
                              value={roleSelectionState?.newRole?.typeSelection}
                              onChange={(option) => onRoleSelectChange('typeSelection', option)}
                            />
                            {roleSelectionState && roleSelectionState.newRole
                              ? (<div style={{margin: "4px", padding: "4px", backgroundColor: "#f2f5ff", borderRadius: "4px"}}>
                                  <b>{roleSelectionState.newRole.typeSelection.label}</b>{newSelectedRoleContextDescription}
                                </div>)
                              : null
                            }                              
                          </Col>
                          <Col sm="1" className="pt-4">
                            <Button className="projectSuccess float-right" onClick={onAddRole} title="Add this role">
                              <FontAwesomeIcon icon="plus" />
                            </Button>
                          </Col>
                        </Row>
                        <Row className="pt-3">
                          <Col>
                            <Table size="sm">
                              <thead>
                                <tr>
                                  <th>Role Name</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                              {_.sortBy(user.roles, r => constants.ROLE_DICTIONARY[r.role_id]).map(r => (
                                <tr key={`tr-role-${r.role_id}`}>
                                  <td>{constants.ROLE_DICTIONARY[r.role_id]}</td>
                                  <td>
                                    <Button onClick={() => onRemoveRole(r)} className="projectDanger" size="sm" title="Remove">
                                      <FontAwesomeIcon icon="times-circle" />
                                    </Button>
                                  </td>
                                </tr>
                                ))}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <Row className="my-4">
                  <Col xs="12">
                    <Row>
                      <Col className="text-right">
                        <ButtonGroup>
                          <Button
                            color="secondary"
                            tag={Link}
                            to="/users/admin"
                          >
                            Cancel
                          </Button>
                          <Button
                            className="projectPrimary"
                            onClick={onSave}
                          >
                            <FontAwesomeIcon icon="save" /> Save
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Fragment>
          );
        }
      }}
    </Media>
  );
}
