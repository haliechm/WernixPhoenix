import React, { Fragment, useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Media } from "react-breakpoints";
import DebounceInput from "react-debounce-input";
import { Col, Button, Row, Table, Card, CardTitle, CardBody, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import classnames from "classnames";
import { api, helpers, contexts, filters as filterHelpers, constants } from "../utils";
const { UserContext } = contexts;
import {
  FilterText,
  FilterableScreen,
  FilterSet,
  FilterSwitch,
  FilterSelect,
  FilterMultiSelect,
  Pager
} from "../components";

const resolveRoleListDescription = (roles) => {
  return roles.join(', ');
};

export default function Users(props) {
  const userCtx = useContext(UserContext);
  const [filters, setFilters] = useState([{filterName: "ActiveOnly", value: true, filteredDisplay: "Active Only"}]);
  const [paginatedList, setPaginatedList] = useState({list: [], pageNumber: 1, totalPages: 1});
  const [sortField, setField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [message, setMessage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    refreshData();
  }, [filters, pageNumber])

  function refreshData() {
    let payload = {
      sortField: sortField,
      sortDirection: sortDirection,
      pageNumber: pageNumber,
      filters: filters
    };
    api.post('admin/users', payload).then((response) => {
      setPaginatedList(response.data.paged_list);
    }).catch(helpers.catchHandler);
  }

  function onFilterChange(changedFilter) {
    const filterChanges = filterHelpers.getFilters(filters, changedFilter);
    setFilters(filterChanges);
  }

  function onImpersonate(u) {
    api.post('admin/impersonate/' + u.id, {}).then((response) => {
      if (response.data.success) {
        userCtx.impersonate(response.data.user, response.data.token);
      } else {
        setMessage({ flavor: "danger", text: response.data.message });
      }
    }).catch(helpers.catchHandler);
  }

  function onUnlockUser(selected) {
    api.post(`admin/unlock_user/${selected.id}`).then(response => {
      if (response.data.success) {
        refreshData();
      } else {
        setMessage({ flavor: "danger", text: response.data.message });
      }
    }).catch(helpers.catchHandler);
  }

  function onToggleMustChangePassword(selected) {
    api.post(`admin/toggle_user_must_change_password/${selected.id}`).then(response => {
      if (response.data.success) {
        refreshData();
      } else {
        setMessage({ flavor: "danger", text: response.data.message });
      }
    }).catch(helpers.catchHandler);
  }

  function onToggleActive(selected) {
    api.post(`admin/toggle_user_active/${selected.id}`).then(response => {
      if (response.data.success) {
        refreshData();
      } else {
        setMessage({ flavor: "danger", text: response.data.message });
      }
    }).catch(helpers.catchHandler);
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
                    <Col><h3 className="primaryText">User Administration</h3></Col>
                  </Row>
                </CardTitle>
                <CardBody className="mb-0 py-1">
                {message
                  ? (<Alert className={message.flavor}>{message.text}</Alert>)
                  : null
                }
                <FilterableScreen
                  filters={
                    <Row>
                      <Col xs="10">
                        <FilterSet
                          filters={filters}
                          clearFilters={() => setFilters([])}
                        >
                          <Row>
                            <Col xs="3">
                              <FilterText
                                filterName="Name"
                                displayName="Name"
                                value={filterHelpers.currentFilterValue(filters, "Name")}
                                onChangeCallback={(e) => onFilterChange(e)}
                              />
                            </Col>
                            <Col xs="3">
                              <FilterSwitch
                                filterName="ActiveOnly"
                                displayName="Active Only"
                                value={filterHelpers.currentFilterValue(filters, "ActiveOnly")}
                                onChangeCallback={(e) => onFilterChange(e)}
                              />
                            </Col>
                            <Col xs="3">
                              <FilterMultiSelect
                                filterName="MemberOfRoles"
                                displayName="Roles"
                                values={filterHelpers.currentFilterValue(filters, 'MemberOfRoles')}
                                onChangeCallback={(e) => onFilterChange(e)}
                                options={constants.ALL_ROLES}
                              />
                            </Col>
                          </Row>
                        </FilterSet>
                      </Col>
                      <Col xs="2" className="pl-0 pr-4">
                        <ButtonGroup className="float-right mr-2">
                          <Button onClick={refreshData} title="Refresh" color="dark">
                            <FontAwesomeIcon icon='recycle' />
                          </Button>
                          <Button
                            className="projectSuccess"
                            tag={Link}
                            to="/user/0"
                            title="Add"
                          >
                            <FontAwesomeIcon icon='plus' />
                          </Button>
                        </ButtonGroup>
                      </Col>
                    </Row>
                  }
                  pager={(<div className="float-right">
                      <Pager 
                        pageNumber={paginatedList?.pageNumber ? paginatedList.pageNumber : 0}
                        totalPages={paginatedList?.totalPages ? paginatedList.totalPages : 0}
                        callBack={(newPageNumber) => setPageNumber(newPageNumber)} 
                      />
                    </div>)}
                >
                  <Row className="p-0 m-0">
                    <Col xs="12">
                      <Table
                        striped
                        hover
                        size="sm"
                        responsive={false}
                        id="userTable"
                      >
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Roles</th>
                            <th></th>
                            <th width="40%">Info</th>
                            <th width="20%"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {_.map(paginatedList.list, u => (
                            <tr key={`u-${u.id}`}>
                              <td>
                                <Link to={`/user/${u.id}`}>
                                  {u.first_name} {u.last_name}
                                </Link>
                                <div style={{fontStyle: "italic", fontWeight: "bold"}}>{u.username}</div>
                              </td>
                              <td>{resolveRoleListDescription(u.roles)}</td>
                              <td>
                                <span
                                  style={{cursor: "pointer"}}
                                  className={classnames({"text-warning": u.must_change_password, "secondary": !u.must_change_password}, "clickable-icon")} 
                                  title={u.must_change_password
                                    ? 'Must change password! - click to remove this requirement'
                                    : 'Click to force change of password'}
                                  onClick={() => onToggleMustChangePassword(u)}
                                  >
                                  <FontAwesomeIcon size="2x" icon='exclamation-triangle' />
                                </span>
                                {u.last_locked_out_at
                                  ? (<span
                                      className={"clickable-icon text-danger"} 
                                      title="Currently locked out - click to unlock"
                                      onClick={() => onUnlockUser(u)}
                                      >
                                      <FontAwesomeIcon size="2x" icon='unlock-alt' />
                                    </span>)
                                  : null
                                }
                              </td>
                              <td>
                                <div>Last Logged On: <span style={{fontStyle: "italic"}}>{u.last_login_at ? u.last_login_at : "Never"}</span></div>
                              </td>
                              <td>
                                <ButtonGroup className="float-right">
                                  <Button
                                    size="sm"
                                    className="projectSecondary minWidth150"
                                    onClick={() => onImpersonate(u)}
                                  >
                                    <FontAwesomeIcon icon='mask' /> Impersonate
                                  </Button>
                                  {u.deactivated_at ? (
                                    <Button
                                      size="sm"
                                      className="projectInfo"
                                      title="Revive"
                                      onClick={() => onToggleActive(u)}
                                    >
                                      <FontAwesomeIcon icon='recycle' />
                                    </Button>
                                  ) : (
                                      <Button
                                        size="sm"
                                        className="projectDanger"
                                        title="Deactivate"
                                        onClick={() => onToggleActive(u)}
                                      >
                                        <FontAwesomeIcon icon='times-circle' />
                                      </Button>
                                  )}
                                </ButtonGroup>
                              </td>
                            </tr>))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </FilterableScreen>
              </CardBody>
            </Card>
          </Fragment>
            );
        }
      }}
    </Media>
  );
}