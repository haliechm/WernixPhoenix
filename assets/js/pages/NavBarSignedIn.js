import React, { useState } from "react";
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

export default function NavBarMain(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpModalOpen, setPopUpModalOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    // navbar for when user is signed in
    <Navbar color="dark" dark expand="sm" fixed>
      <PopUpModal
        popUpModalOpen={popUpModalOpen}
        setPopUpModalOpen={setPopUpModalOpen}
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
            HALIECHM
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
