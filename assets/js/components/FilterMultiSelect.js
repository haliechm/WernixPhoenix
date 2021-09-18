import React, { Component, Fragment, useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from "react-select/animated";
import _ from 'lodash';

export default function FilterMultiSelect(props) {
  const [values, setValues] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setValues(props.values || null);
    setOptions(props.options || []);
  }, [props.values, props.options])

  function onChange(selections) {
    if (!selections){
      props.onChangeCallback({
        filterName: props.filterName,
        value: [],
        labels: [],
        filteredDisplay: ""
      });
      return;
    }
    const labels = selections.map(x => x.label);
    const valuesDisplay = labels.join(', ');
    props.onChangeCallback({
      filterName: props.filterName,
      value: selections.map(x => x.value),
      labels: labels,
      filteredDisplay: valuesDisplay
        ? `${props.displayName}: ${valuesDisplay}`
        : ''
    });
  }

  if (!props.options) return null;
  const selectedValues = (!values || values.length === 0)
    ? null
    : _.filter(options, o => _.includes(values, o.value));
  return (
  <Fragment>
    <div className="filter-definition-caption">{props.displayName}:</div>
    {selectedValues === null // working around a deficiency in this select control for setting no items selected on a multiselect
    ? (<Select
        closeMenuOnSelect={true}
        isMulti
        components={makeAnimated()}
        options={options}
        onChange={onChange}
        values={null}
        value={null}
        classNamePrefix="react-select"
      />)
    : (<Select
        closeMenuOnSelect={true}
        isMulti
        components={makeAnimated()}
        options={options}
        onChange={onChange}
        values={selectedValues}
        classNamePrefix="react-select"
      />)
    }
  </Fragment>);
}
