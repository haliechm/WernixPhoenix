import React, { Fragment, useState, useEffect, useRef, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardTitle,
  Col,
  Input,
  Row,
  Table,
  Alert
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FilterText,
  FilterableScreen,
  FilterSet,
  FilterSwitch,
  Pager,
  SortHeader
} from "../components";
import {
  constants,
  helpers,
  api,
  contexts,
  filters as filterHelpers
} from "../utils";
const { UserContext } = contexts;
import _ from "lodash";

const emptyItem = { id: 0, name: "" };

export default function ReferenceDataList(props) {
  const userCtx = useContext(UserContext);
  const metaData = _.find(constants.REFERENCE_DATA_URL_LIST, x => x.reactPath === props.location.pathname);
  const [filters, setFilters] = useState([{filterName: "ActiveOnly", value: true, filteredDisplay: "Active Only"}]);
  const [editItem, setEditItem] = useState(null);
  const [paginatedList, setPaginatedList] = useState({list: [], pageNumber: 1, totalPages: 1});
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState(constants.SORT_DIRECTION.ASC);
  const [message, setMessage] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    refreshData();
  }, [filters, pageNumber, sortField, sortDirection])

  function refreshData() {
    let payload = {
      sortField: sortField,
      sortDirection: sortDirection,
      pageNumber: pageNumber
    };
    _.each(filters, filter => payload[filter.filterName] = filter.value);
    api.post(metaData.listURL, payload).then((response) => {
      setPaginatedList(response.data.paged_list);
      setMessage(null);
    }).catch(helpers.catchHandler);
  }

  function onFilterChange(changedFilter) {
    const filterChanges = filterHelpers.getFilters(filters, changedFilter);
    setFilters(filterChanges);
  }

  function onSort(field, direction) {
    if (sortField !== field) 
    {
      setSortField(field);
    }
    if (sortDirection !== direction) 
    {
      setSortDirection(direction);
    }
  }

  function onChange(fieldName, fieldValue) {
    setEditItem({
      ...editItem,
      [fieldName]: fieldValue
    });
  }

  function onAdd() {
    let tempArray = paginatedList.list.slice();
    tempArray.unshift(emptyItem);
    setPaginatedList({ ...paginatedList, list: tempArray });
    setEditItem(emptyItem);
  }

  function editingNew() {
    return paginatedList?.list?.length && !paginatedList.list[0].id;
  }

  function cancelNew() {
    let temporaryArray = paginatedList.list.slice();
    temporaryArray.shift();
    setPaginatedList({ ...paginatedList, list: temporaryArray });
  }

  function onEdit(item) {
    if (editingNew()) cancelNew();
    setEditItem(item);
  }

  function onEditKeyPress(e) {
    if (e.key === "Enter") {
      onSave();
    }
  }

  function onEditKeyDown(e) {
    if (e.keyCode === 27) { // 27=Escape
      onCancelEdit();
    }
  }

  function onCancelEdit() {
    if (editingNew()) cancelNew();
    setEditItem(emptyItem);
  }

  function onToggleActive(item) {
    api.post(metaData.toggleURL + '/' + item.id).then((r) => {
      if (r.data.success) {
        refreshData();
      } else {
        setMessage({ flavor: "projectDanger", text: r.data.message });
      }
    }).catch(helpers.catchHandler);
  }

  function onSave() {
    if (!editItem?.name) {
      setMessage({ flavor: "projectWarning", text: 'Please provide text in order to save.' });
      return;
    }
    api.post(metaData.saveURL, editItem).then((r) => {
      if (r.data.success) {
        setEditItem(emptyItem);
        refreshData();
      } else {
        setMessage({ flavor: "projectDanger", text: r.data.message });
      }
    }).catch((error) => {
      setMessage({ flavor: "projectDanger", text: `An unexpected error occurred - your ${metaData.elementName} was not saved!` });
      helpers.catchHandler(error);
    });
  }

  const extraColCount = metaData.extraReadOnlyColumns ? metaData.extraReadOnlyColumns.length : 0;

  return (
      <Fragment>
        <Card className="m-2 pb-0">
          <CardTitle className="mt-3 ml-3 mb-0">
            <Row className="expand-md mt-2 mb-0 pb-0">
              <Col><h3 className="primaryText">{metaData.pageTitle}</h3></Col>
              <Col className="mr-3">
              {editingNew() ? null :
                <ButtonGroup className="float-right">
                  <Button
                    className="projectSuccess btn-lg"
                    title={`New ${metaData.elementName}`}
                    onClick={onAdd}
                    size="sm"
                  >
                    <FontAwesomeIcon icon="plus-circle" /> {`New ${metaData.elementName}`}
                  </Button>
                </ButtonGroup>
              }
              </Col>
            </Row>
          </CardTitle>
          <CardBody className="mb-0 py-1">
            {message
              ? (<Alert className={message.flavor}>{message.text}</Alert>)
              : null
            }
            <FilterableScreen
              filters={
                <Row className="expand-md mt-2 mb-0 pb-0">
                  <Col xs="12">
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
                      </Row>
                    </FilterSet>
                  </Col>
                </Row>
              }
              pager={(
                <div className="float-right">
                  <Pager 
                    pageNumber={paginatedList?.page_number ? paginatedList.page_number : 0}
                    totalPages={paginatedList?.total_pages ? paginatedList.total_pages : 0}
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
                >
                  <thead>
                    <tr>
                      <th>
                        <SortHeader
                          displayName="Name"
                          fieldName="name"
                          sortDirection={sortDirection}
                          sorted={sortField === 'name'}
                          onCallback={(sf, sd) => onSort(sf, sd)}
                        />
                      </th>
                      {extraColCount > 0 && _.map(metaData.extraReadOnlyColumns, ({label: colTitle}) => (
                        <th key={`th-${colTitle}`}>{colTitle}</th>))}
                      <th width="20%"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {_.map(paginatedList.list, item => (
                    <Fragment key={item.id}>
                      {editItem && item.id === editItem.id ? (
                        <tr className="data-row">
                          <td colSpan={1 + extraColCount}>
                            <Input
                              value={editItem.name}
                              name="name"
                              label="name"
                              autoFocus={true}
                              onChange={(e) => onChange(e.target.name, e.target.value)}
                              onKeyPress={onEditKeyPress}
                              onKeyDown={onEditKeyDown}
                              maxLength={metaData.maxNameLength || 50}
                            />
                          </td>
                          <td className="text-right">
                            <ButtonGroup>
                              <Button
                                className="projectSecondary"
                                onClick={onCancelEdit}
                                size="sm"
                              >
                                <FontAwesomeIcon icon="times-circle" />
                              </Button>
                              <Button
                                className="projectPrimary"
                                onClick={onSave}
                                size="sm"
                              >
                                <FontAwesomeIcon icon="save" /> Save
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      ) : (
                        <tr className="data-row">
                          <td>{item.name}</td>
                          {extraColCount > 0 && _.map(metaData.extraReadOnlyColumns, ({value: colName}) => (
                            <td key={`col-${colName}-${item.id}`}>{item[colName]}</td>))}
                          <td className="text-right">
                            <ButtonGroup>
                              <Button
                                onClick={() => onEdit(item)}
                                className="projectPrimary"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="edit" /> Edit
                              </Button>
                            {item.deactivated_at ? (
                              <Button
                                size="sm"
                                className="projectInfo"
                                title="Revive"
                                onClick={() => onToggleActive(item)}
                              >
                                <FontAwesomeIcon icon='recycle' />
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                className="projectDanger"
                                title="Deactivate"
                                onClick={() => onToggleActive(item)}
                              >
                                <FontAwesomeIcon icon='times-circle' />
                              </Button>
                            )}
                            </ButtonGroup>
                          </td>
                        </tr>
                      )}
                    </Fragment>))}
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
