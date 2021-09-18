import React from "react";
import _ from "lodash";
import * as constants from "./constants";
import * as dates from "./dates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { ROLE_NAMES } = constants.default;

function mustChangePassword(user, impersonating) {
  if (!user || impersonating) return false;
  return user.must_change_password;
};

const hasAnyRole = (roles, rolesToCheck) => {
  if (!roles || !rolesToCheck || !roles.length || !rolesToCheck.length) {
    return false;
  }
  return _.intersection(roles, rolesToCheck).length > 0;
};

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    }, wait);
    if (immediate && !timeout) func.apply(context, args);
  };
};

function currentYPosition() {
  if (!window) {
    return;
  }
  // Firefox, Chrome, Opera, Safari
  if (window.pageYOffset) return window.pageYOffset;
  // Internet Explorer 6 - standards mode
  if (document.documentElement && document.documentElement.scrollTop)
    return document.documentElement.scrollTop;
  // Internet Explorer 6, 7 and 8
  if (document.body.scrollTop) return document.body.scrollTop;
  return 0;
};

function elementYPosition(elm) {
  var y = elm.offsetTop;
  var node = elm;
  while (node.offsetParent && node.offsetParent !== document.body) {
    node = node.offsetParent;
    y += node.offsetTop;
  }
  return y;
};

function scrollTo(elmID) {
  var elm = document.getElementById(elmID);
  if (!elmID || !elm) {
    return;
  }
  var startY = currentYPosition();
  var stopY = elementYPosition(elm);
  var distance = stopY > startY ? stopY - startY : startY - stopY;
  if (distance < 100) {
    scrollTo(0, stopY);
    return;
  }
  var speed = Math.round(distance / 50);
  if (speed >= 20) speed = 20;
  var step = Math.round(distance / 25);
  var leapY = stopY > startY ? startY + step : startY - step;
  var timer = 0;
  if (stopY > startY) {
    for (var i = startY; i < stopY; i += step) {
      setTimeout(
        (function(leapY) {
          return () => {
            window.scrollTo(0, leapY);
          };
        })(leapY),
        timer * speed
      );
      leapY += step;
      if (leapY > stopY) leapY = stopY;
      timer++;
    }
    return;
  }
  for (let i = startY; i > stopY; i -= step) {
    setTimeout(
      (function(leapY) {
        return () => {
          window.scrollTo(0, leapY);
        };
      })(leapY),
      timer * speed
    );
    leapY -= step;
    if (leapY < stopY) leapY = stopY;
    timer++;
  }
  return false;
};

function classList(classes) {
  return Object.entries(classes)
    .filter(entry => entry[1])
    .map(entry => entry[0])
    .join(" ");
};

function requiredStar() {
  return (<span className="text-danger">*</span>);
}

function emailIsValid(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function hasEditingRole(roles) {
  return hasAnyRole(roles, [
    ROLE_NAMES.SYSADMIN,
    ROLE_NAMES.DOCK_SUPERVISOR,
  ]);
}

function hasAdminRole(roles) {
  return hasAnyRole(roles, [
    ROLE_NAMES.SYSADMIN
  ]);
}

function browserExportCSVFile(csv, fileTitle) {
  var fname = fileTitle || "export.csv";
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, fname);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fname);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function catchHandler(err) {
  console.error(err);
}

function idNameToValueLabel(list) {
  return _.map(list, x => ({...x, value: x.id, label: x.name}));
}

const changeDateFormat = (
  date,
  changeDateFunction,
  fieldName = null,
  itemToEditId = null
) => {
  let formattedDate = null;
  if (dates.isValidDate(date)) {
    const dateString = dates.parseDatePickerDate(
      date,
      dates.MDY
    );
    formattedDate = dates.momentFromString(dateString);
  }
  if (fieldName && itemToEditId >= 0) {
    changeDateFunction(formattedDate, fieldName, itemToEditId);
    return;
  } else if (fieldName) {
    changeDateFunction(formattedDate, fieldName);
    return;
  } else if (itemToEditId >= 0) {
    changeDateFunction(formattedDate, itemToEditId);
    return;
  } else {
    changeDateFunction(formattedDate);
    return;
  }
};

const onDatePickerKeyDown = (
  event,
  changeDateFunction,
  fieldName = null,
  itemToEditId = null
) => {
  if (event.which === 9 || event.which === 13) {
    // tab key or enter key
    const eventAction = event && event.target ? event.target.value : null;
    changeDateFormat(eventAction, changeDateFunction, fieldName, itemToEditId);
  }
};

const helpers = {
  requiredStar,
  emailIsValid,
  debounce,
  browserExportCSVFile,
  mustChangePassword,
  currentYPosition,
  elementYPosition,
  idNameToValueLabel,
  scrollTo,
  classList,
  catchHandler,
  onDatePickerKeyDown
};

export default helpers;
