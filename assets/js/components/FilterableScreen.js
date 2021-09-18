import React, { Fragment } from "react";
import { Media } from "react-breakpoints";

const FilterableScreen = (props) => (
  <Media>
    {({ breakpoints, currentBreakpoint }) => {
      switch (currentBreakpoint) {
        case breakpoints.mobile:
          return (
            <Fragment>
              <div className="mobileWithFilterFooter">{props.children}</div>
              <div className="mobileFilterFooter">{props.filters}</div>
            </Fragment>
          );
        case breakpoints.desktop:
        default:
          return (
            <div className="filterableScreen">
              {props.filters &&
                <div className="filterPagerHeader">{props.filters}</div>
              }
              <div className="contentWithFilters">{props.children}</div>
              {props.pager &&
                <div className="pagerFooter">{props.pager}</div>
              }
            </div>
          );
      }
    }}
  </Media>
);

export default FilterableScreen;