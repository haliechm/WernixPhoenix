import React, { useState } from "react";
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
  const toggle = () => setIsOpen(!isOpen);

  return (
    // navbar for main homepage
    <Navbar color="dark" dark expand="md" fixed id="nav_bar_main">
      <NavbarBrand className="ml-3" href="/">
        WERNIX
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {props.showItems ? (
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="register">Sign Up</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="login">Log In</NavLink>
            </NavItem>
          </Nav>
        ) : (
          <Nav className="mr-auto" navbar></Nav>
        )}

        <UncontrolledDropdown>
          <DropdownToggle nav caret style={{ color: "white" }}>
            Site Language: English
          </DropdownToggle>
          <DropdownMenu right>
            {/* LOOP THROUGH ALL LANGUAGES WE SUPPORT AND DISPLAY HERE!! */}
            <DropdownItem>English</DropdownItem>
            <DropdownItem>Spanish</DropdownItem>
            <DropdownItem>Italian</DropdownItem>
            <DropdownItem>Russian</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Collapse>
    </Navbar>
  );
}
