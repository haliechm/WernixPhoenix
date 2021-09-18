import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPagePro = (props) => {
  return (
    <MDBFooter className="page-footer font-small pt-4 mt-4 bg-dark text-light">
      {/* <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
        </MDBContainer>
      </div> */}
      <MDBContainer fluid className="text-center text-md-left">
        {props.mainPage ? (
          <div className="text-center py-3">
            <ul className="list-unstyled list-inline mb-0">
              <li className="list-inline-item mr-4">
                <h4>Practice speaking in other langauges today!</h4>
              </li>

              <li className="list-inline-item">
                <Link
                  to="register"
                  className="btn btn-light btn-rounded sign-up-button"
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div></div>
        )}
        <hr />
        <MDBRow>
          <MDBCol md="6">
            <h5 className="mb-4 mt-3 font-weight-bold">
              &copy; 2021 WERNIX AREA
            </h5>

            <p>
              Wernix Area strives to create a way for people all over the world
              to communicate and learn from one another
            </p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
          <MDBCol md="3"></MDBCol>
          <MDBCol md="3">
            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">
              More Information
            </h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!">About Us</a>
              </li>
              <li>
                <a href="#!">Contact Us</a>
              </li>
              <li>
                {props.mainPage ? (
                  <Link to="login">Log In</Link>
                ) : (
                  <Link to="/">Sign Out</Link>
                )}
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="12" className="mt-5">
            <p
              style={{ textAlign: "center", fontSize: "small", opacity: "20%" }}
            >
              We should learn languages because language is the only thing worth
              knowing even poorly. ― Kató Lomb
            </p>
          </MDBCol>
          <hr className="clearfix w-100 d-md-none" />
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default FooterPagePro;
