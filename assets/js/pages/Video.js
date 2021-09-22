import React from "react";
import { NavBarSignedIn } from ".";

export default function Video(props) {
  return <NavBarSignedIn setRedirectTo={props.setRedirectTo} />;
}
