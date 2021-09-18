import React, { Component, Fragment, useState, useEffect } from "react";
import DebounceInput from "react-debounce-input";

export default function FilterText(props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(props.value || "")
  }, [props.value])

  function onChange(value) {
    let resolvedValue = value;
    if (props.forceInt) {
      resolvedValue = parseInt(value);
      if (isNaN(resolvedValue)) {
        resolvedValue = null;
      }
    }
    const filteredDisplay = resolvedValue
      ? props.useEqualsDisplayName
        ? `${props.displayName}: ${resolvedValue}`
        : `${props.displayName} ${props.descriptionPrefix ? props.descriptionPrefix : "starts with"} ${resolvedValue}`
      : null;
    setValue(resolvedValue);
    props.onChangeCallback({
      filterName: props.filterName,
      value: resolvedValue,
      filteredDisplay: filteredDisplay
    });
  }

  return (
    <Fragment>
      <div className={props.customFilterClassName ? props.customFilterClassName : "filter-definition-caption"}>
        {props.displayName}
      </div>
      <DebounceInput
        className="form-control"
        minLength={props.minLength || 2}
        value={value}
        debounceTimeout={props.debounceTimeout || 500}
        onChange={event => onChange(event.target.value)}
      />
    </Fragment>
  );
}
