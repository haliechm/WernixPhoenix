import React, { Fragment, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { Media } from "react-breakpoints";
import {
  Col,
  Button,
  Row,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { LinkPanel } from "../components";
import { constants, contexts, helpers } from "../utils";
const { UserContext } = contexts;

export default function Admin(props) {
  const userCtx = useContext(UserContext);
  const [access, setAccess] = useState(false);

  useEffect(() => {
    // if (userCtx?.currentUser?.roles) {
    //   const access = helpers.verifyModuleAccess(constants.SCREEN_NAMES.ADMIN, userCtx?.currentUser?.roles)
    //   setAccess(access);
    // }

  }, [userCtx])

  if (!access) {
    return "You do not have access to this screen."
  }

  const sortedMiscLinks = _.chain(constants.REFERENCE_DATA_URL_LIST)
    .map((page) => {
      return {
        title: page.pageTitle,
        renderLink: (
          <LinkPanel
            key={`link-${page.pageTitle}`}
            colSize="4"
            title={page.pageTitle}
            routePath={page.reactPath}
            iconKey={page.iconKey}
          />
        )
      }
    })
    // .concat([{
    //   title: 'Another One',
    //   renderLink: (
    //   <LinkPanel
    //     key='link-flags'
    //     colSize="4"
    //     title='Dock Status Flags'
    //     routePath='/flags'
    //     iconKey='flag'
    //   />
    //   )}
    // ])
    .sortBy(l => { return l.title })
    .map(l => {return l.renderLink})
    .value();
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
              <Row>
                <LinkPanel
                  key={`link-users`}
                  colSize="4"
                  title={'Users'}
                  routePath={'/users'}
                  iconKey={'user'}
                />
                {sortedMiscLinks}
              </Row>
            </Fragment>
            );
        }
      }}
    </Media>
  );
}
