import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { PopUpModal } from "./";
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  NavbarText,
  DropdownMenu,
  Collapse,
} from "reactstrap";
import { api, helpers, contexts, constants } from "../utils";
const { UserContext } = contexts;

export default function NavBarMain(props) {
  const userCtx = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function logout() {
    setSaveChanges(false);
    props.setRedirectTo("/");
    api
      .post("log_out")
      .then((response) => {
        userCtx.signOut();
      })
      .catch((error) => {
        console.error(error);
        userCtx.signOut();
        Alert.error("There was an error logging out");
      });
  }

  useEffect(() => {
    // if user clicked logout on popout modal: 
    if (saveChanges) {
      logout();
    }
  }, [saveChanges]);

  return (
    // navbar for when user is signed in
    <Navbar color="dark" dark expand="sm" fixed>
      <PopUpModal
        popUpModalOpen={popUpModalOpen}
        setPopUpModalOpen={setPopUpModalOpen}
        setSaveChanges={setSaveChanges}
        action={"Logout"}
      />
      <NavbarBrand className="ml-3 mr-4" href="user_profile">
        WERNIX
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="video" className="mr-2">
                <i class="fa fa-regular fa-video icon-nav"></i>
                VIDEO
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="chat">
                <i class="fas fa-comment-alt icon-nav"></i>
                {/* <i class="far fa-comments icon-nav"></i> */}
                CHAT
              </NavLink>
            </NavItem>
          </Nav>
        }

        <UncontrolledDropdown>
          <DropdownToggle nav caret style={{ color: "white" }}>
            {userCtx.currentUser?.username}
          </DropdownToggle>
          <DropdownMenu right>
            <Link to="user_profile" className="no-text-decoration">
              <DropdownItem>
                <i className="far fa-user-circle icon-nav"></i>
                Your profile
              </DropdownItem>
            </Link>
            <Link to="settings" className="no-text-decoration">
              <DropdownItem>
                <i className="fas fa-cog icon-nav"></i>
                Settings
              </DropdownItem>
            </Link>
            <DropdownItem>
              <i className="fas fa-question-circle icon-nav"></i>
              Help
            </DropdownItem>
            <Link
              onClick={() => {
                setPopUpModalOpen(!popUpModalOpen);
              }}
              className="no-text-decoration"
            >
              <DropdownItem>
                <i className="fas fa-sign-out-alt icon-nav"></i>
                Logout
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  );
}
