import React from "react";
import ReactDOM from "react-dom";
// import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router } from "react-router-dom";
import ReactBreakpoints from "react-breakpoints";
import { ErrorBoundary } from "react-error-boundary";
import { Button, Row, Col, Container } from "reactstrap";
import { constants } from "./utils";
import App from "./app.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp,
  faAngleDown,
  faFilter,
  faExclamationTriangle,
  faSearch,
  faClipboardCheck,
  faArrowCircleRight,
  faCheckCircle,
  faDownload,
  faHourglass,
  faHourglassHalf,
  faBan,
  faPlusCircle,
  faEdit,
  faTimesCircle,
  faTrash,
  faRecycle,
  faUser,
  faFileUpload,
  faPrint,
  faAngleDoubleDown,
  faFileCsv,
  faUnlockAlt,
  faMapMarkedAlt,
  faCog,
  faFlag,
  faChartBar,
  faDoorClosed,
  faComments,
  faImages,
  faSave,
  faHome,
  faEye,
  faCheck,
  faPlus,
  faBackspace,
  faMinus,
  faGripLines,
  faTimes,
  faTrashAlt,
  faMask,
  faAward,
  faWarehouse,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faBroom,
  faClock,
  faList,
  faInfoCircle,
  faReply,
  faBars,
  faUserCircle,
  faMoneyCheckAlt,
  faDollarSign,
  faFileInvoiceDollar,
  faBuilding,
  faTrailer,
  faQuestion,
  faMagic,
  faBook,
  faThermometerHalf,
  faTruckLoading,
  faTruck,
  faFill,
  faTools,
  faBullhorn,
  faCalculator,
  faChartLine,
  faPallet,
  faFile,
  faMarker,
  faPencilAlt,
  faPhone,
  faTags,
  faThumbtack,
  faCut,
  faBalanceScaleLeft,
  faDesktop,
  faTabletAlt,
  faPlug,
  faFrown,
  faMeh,
  faPeopleCarry,
  faSmile,
  faUserClock,
  faUserEdit,
  faCogs,
  faShippingFast,
  faAsterisk,
  faBell,
  faCommentAlt,
  faBoxes,
  faDolly,
  faDollyFlatbed,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faEye,
  faAngleUp,
  faAngleDown,
  faFilter,
  faExclamationTriangle,
  faSearch,
  faClipboardCheck,
  faCheckCircle,
  faDownload,
  faHourglass,
  faHourglassHalf,
  faBan,
  faArrowCircleRight,
  faPlusCircle,
  faAngleDoubleDown,
  faFileCsv,
  faEdit,
  faTimesCircle,
  faTrash,
  faRecycle,
  faInfoCircle,
  faMapMarkedAlt,
  faCog,
  faFlag,
  faChartBar,
  faDoorClosed,
  faUnlockAlt,
  faUser,
  faFileUpload,
  faPrint,
  faComments,
  faImages,
  faSave,
  faHome,
  faCheck,
  faPlus,
  faBackspace,
  faMinus,
  faGripLines,
  faTimes,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faTrashAlt,
  faReply,
  faMask,
  faAward,
  faWarehouse,
  faBroom,
  faClock,
  faList,
  faBars,
  faUserCircle,
  faMoneyCheckAlt,
  faDollarSign,
  faFileInvoiceDollar,
  faBuilding,
  faTrailer,
  faQuestion,
  faMagic,
  faBook,
  faThermometerHalf,
  faTruckLoading,
  faTruck,
  faFill,
  faTools,
  faBullhorn,
  faCalculator,
  faChartLine,
  faPallet,
  faFile,
  faMarker,
  faPencilAlt,
  faPhone,
  faTags,
  faThumbtack,
  faCut,
  faBalanceScaleLeft,
  faDesktop,
  faTabletAlt,
  faPlug,
  faFrown,
  faMeh,
  faPeopleCarry,
  faSmile,
  faUserClock,
  faUserEdit,
  faCogs,
  faShippingFast,
  faAsterisk,
  faBell,
  faCommentAlt,
  faBoxes,
  faDolly,
  faDollyFlatbed
);

const { BREAKPOINTS } = constants;

const goBack = () => {
  window.history.back();
};

const AppFallBackComponent = ({ componentStack, error }) => {
  console.log("componentStack :\n", componentStack, "\n\n error : \n\n", error);
  return (
    <Container>
      <Row className="m-5">
        <Col>
          <h4>Something went wrong on our side.</h4>
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          <h4>
            Please use your browser&#39;s back button to return to the previous
            screen.
          </h4>
        </Col>
      </Row>
      <Row className="m-5">
        <Col>
          <h4>
            <Button onClick={goBack}>Or click here</Button>
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

ReactDOM.render(
  <ReactBreakpoints breakpoints={BREAKPOINTS}>
    <Router>
      <ErrorBoundary FallbackComponent={AppFallBackComponent}>
        <App />
      </ErrorBoundary>
    </Router>
  </ReactBreakpoints>,
  document.getElementById("root")
);
// serviceWorker.register();
