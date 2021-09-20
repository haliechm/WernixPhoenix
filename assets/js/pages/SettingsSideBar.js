import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function SettingsSideBar(props) {
  return (
    <div className="friends-list">
      <Link onClick={() => props.setChosenToEdit("PROFILE")}>
        <h6 className={props.chosenToEdit == "PROFILE" ? "selected" : ""}>
          <i className="far fa-user"></i>
          Profile
        </h6>
      </Link>
      <Link onClick={() => props.setChosenToEdit("PASSWORD")}>
        <h6 className={props.chosenToEdit == "PASSWORD" ? "selected" : ""}>
          <i className="fas fa-lock"></i>
          Password
        </h6>
      </Link>
      <Link onClick={() => props.setChosenToEdit("LANGUAGE")}>
        <h6 className={props.chosenToEdit == "LANGUAGE" ? "selected" : ""}>
          <i className="far fa-comments"></i>
          Language
        </h6>
      </Link>
      <Link onClick={() => props.setChosenToEdit("ACCOUNT")}>
        <h6 className={props.chosenToEdit == "ACCOUNT" ? "selected" : ""}>
          <i className="far fa-folder-open"></i>
          Account
        </h6>
      </Link>
    </div>
  );
}
