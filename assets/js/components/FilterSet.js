import React, { Component, Fragment } from "react";
import { Row, Collapse, Button, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

export default class FilterSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterDisplayText: "",
      collapse: !(props.open || true),
      clearFilters: props.clearFilters
    };
    this.toggleFilter = this.toggleFilter.bind(this);
    this.getFilterDisplay = this.getFilterDisplay.bind(this);
  }

  componentDidMount() {
      this.setState({filterDisplayText: this.getFilterDisplay(this.props.filters)});
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(prevProps.filters, this.props.filters)) {
      this.setState({filterDisplayText: this.getFilterDisplay(this.props.filters)});
    }
  }

  toggleFilter() {
    this.setState((prevState) => { return { collapse: !prevState.collapse }}, () => {
      if (this.props.toggleFilters) {
        this.props.toggleFilters(this.state.collapse);
      }}
    );
  }

  getFilterDisplay(filters) {
    if (!filters || !filters.length || filters.length === 0) {
      return null;
    }
    const filterDisplay = _.chain(filters)
      .map(x => {
        return x.value !== null || x.values || x.startDate || x.endDate
          ? x.filteredDisplay
          : null}
      )
      .filter(x => x !== null && x !== undefined)
      .value()
      .join(" | ");
    if (!filterDisplay) {
      return "";
    }
    return ` - ${filterDisplay}`;
  }

  render() {
    const showButtonArea = this.props.buttonArea;
    const filterDisplayAreaSize = showButtonArea ? (12 - this.props.buttonAreaColSize) : 12;
    return (
      <Row className="m-0 p-0 mb-2">
        <Col className="m-0 px-3 py-1">
          <Row>
            <Col xs={filterDisplayAreaSize}>
              <span
                title="Toggle filter display"
                className={
                  this.props.customFilterClassName
                    ? this.props.customFilterClassName
                    : "filter"
                }
                onClick={() => this.toggleFilter()}
              >
                <FontAwesomeIcon icon="filter" /> Filters
              </span>
              <span className="filter-display" title={this.state.filterDisplayText}>
                {this.state.filterDisplayText}
              </span>
              {this.props.filters && this.props.filters.length !== 0 &&
                (
                <Button
                  className="projectDangerOutline ml-4 xs"
                  size="sm"
                  style={{ marginTop: "-6px", marginBottom: "4px" }}
                  onClick={this.props.clearFilters}
                >
                  <FontAwesomeIcon
                    icon="backspace"
                    className="mr-2 ml-0 mt-0 mb-0"
                  />{" "}
                  Clear
                </Button>
              )}
            </Col>
            {showButtonArea &&
              <Col xs={this.props.buttonAreaColSize || "2"} className={this.props.buttonAreaClassName || ""}>
                {this.props.buttonArea}
              </Col>
            }
          </Row>
          <Collapse isOpen={this.state.collapse}>
            <Row
              className={
                this.props.childrenClassName ? this.props.childrenClassName : "filter-definition-row"
              }
            >
              <Col xs="12">
                {this.props.children}
              </Col>
            </Row>
          </Collapse>
        </Col>
      </Row>
    );
  }
}
