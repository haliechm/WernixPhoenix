import React, { Fragment, useState, useContext, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  CardBody,
  CardHeader,
  Badge,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import { api, constants, contexts, dates, helpers } from "../utils";
const { UserContext } = contexts;

const nowTime = () => new Date().getTime();
window.lastRefreshedAt = nowTime();

export default function Dashboard(props) {
  const userCtx = useContext(UserContext);
  // const [access, setAccess] = useState(false);

  // useEffect(() => {
  //   if (userCtx?.currentUser?.roles) {
  //   }
  // }, [userCtx]);

  return (
    <Card className="mb-0">
      <CardBody className="px-3 py-1">
        (Landing Screen)
      </CardBody>
    </Card>
  );
}
