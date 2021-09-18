import React, { useState, useEffect } from "react";
import moment from 'moment';
import DatePicker from "react-datepicker";
import { Col, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { dates, helpers, filterHelpers } from "../utils";

export default function DateRangeFilter(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    setStartDate(props.startDate);
    setEndDate(props.endDate);
  }, [props.startDate, props.endDate]);


  useEffect(() => {
    const startDisplay = startDate
      ? `On or After ${dates.toMDY(startDate)}`
      : null;
    const endDisplay = endDate
      ? `On or Before ${dates.toMDY(endDate)}`
      : null;
    let displayList = [startDisplay, endDisplay].filter(x => x).join(", ");
    let displayText = `${props.displayName}: ${displayList}`;
    if (startDate || endDate) {
      props.onChangeCallback({
        startDate: startDate,
        endDate: endDate,
        filterName: props.filterName,
        filteredDisplay: displayText
      });
    }
  }, [startDate, endDate]);

  function changeStart(startChange) {
    const dateMoment = startChange ? moment(startChange).toDate() : null;
    setStartDate(dateMoment);
  }

  function changeEnd(endChange) {
    const dateMoment = endChange ? moment(endChange).toDate() : null;
    setEndDate(dateMoment);
  }

  return (
    <Row>
    <Col>
        <div className="form-group">
        <div className="filter-caption">{props.displayName}</div>
        <DatePicker
            selected={startDate || ""}
            onChange={changeStart}
            className="form-control"
            onKeyDown={event => helpers.onDatePickerKeyDown(event, changeStart)}
        />
        </div>
    </Col>
    <Col>
        <div className="form-group">
        <div className="filter-caption">
            {props.displayName2 ? props.displayName2 : "To"}
        </div>
        <DatePicker
            selected={endDate || ""}
            onChange={changeEnd}
            className="form-control"
            onKeyDown={event => helpers.onDatePickerKeyDown(event, changeEnd)}
        />
        </div>
    </Col>
    </Row>
);
}
