import React, { Component, Fragment, useState, useEffect } from 'react';
import Switch from "react-switch";

export default function FilterSwitch(props) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    setValue(props.value || false)
  }, [props.value])

  function onChange(checked) {
    const filteredDisplay = checked
        ? props.displayName
        : '';
    props.onChangeCallback({
      filterName: props.filterName,
      value: checked,
      filteredDisplay,
    });
    setValue(checked);
  }

  return (
  <Fragment>
    <div className='filter-definition-caption' style={{display: 'block'}}>{props.displayName}</div>
    <Switch
      onChange={(checked) => onChange(checked)}
      checked={value || false}
    />
  </Fragment>);
}
