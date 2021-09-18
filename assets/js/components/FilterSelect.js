import React, { Component, Fragment, useState, useEffect } from 'react';
import Select from "react-select";
import makeAnimated from "react-select/animated";
import _ from 'lodash';

export default function FilterSelect(props) {
  const [value, setValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValue(props.value || null);
    setOptions(props.options || []);
  }, [props.value, props.options])

  function onChange(selection) {
    const label = selection === null ? null : selection.label;
    props.onChangeCallback({
      filterName: props.filterName,
      value: selection === null ? null : selection.value,
      label: label,
      filteredDisplay: value === null
        ? ''
        : `${props.displayName}: ${label}`
    });
  }

  const selectedValue = (!value)
    ? null
    : _.find(options, x => x.value === value);
  if (!options) return null;
  return (
    <Fragment>
      <div className="filter-definition-caption">{props.displayName}</div>
      <Select
        closeMenuOnSelect={true}
        isMulti={false}
        components={makeAnimated()}
        isClearable={true}
        options={options}
        onChange={onChange}
        value={selectedValue}
        onBlurResetsInput={false}
        onSelectResetsInput={false}
        onCloseResetsInput={false}
        classNamePrefix="react-select"
      />
    </Fragment>
  );
}
