import React, { useState, useEffect } from 'react';
import { constants } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SortHeader(props) {
  const [direction, setDirection] = useState(props.sortDirection || constants.SORT_DIRECTION.ASC);

  useEffect(() => {
    setDirection(props.sortDirection || constants.SORT_DIRECTION.ASC);
  }, [props.sortDirection])

  const callBackDir = direction === constants.SORT_DIRECTION.DESC 
    ? constants.SORT_DIRECTION.ASC 
    : constants.SORT_DIRECTION.DESC;

  return (
    <div onClick={() => props.onCallback(props.fieldName, callBackDir)} className="sort-handle">
      <span style={{display: "inline-block", paddingRight: "3px"}}>{props.displayName}</span>
      {props.sorted && direction === constants.SORT_DIRECTION.ASC
        ? <FontAwesomeIcon icon="angle-up" />
        : null
      }
      {props.sorted && direction === constants.SORT_DIRECTION.DESC
        ? <FontAwesomeIcon icon="angle-down" />
        : null
      }
    </div>
  );
}