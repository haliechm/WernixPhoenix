import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Friends(props) {
  return (
    <div className="friends-list">
      <Link
        onClick={() => {
          props.setUserModalOpen(!props.userModalOpen);
          props.setUsernameChosen("@Vladimir_1917");
        }}
      >
        {/* onClick=
        {() => {
          props.setUsernameChosen("@Vladimir_1917");
          console.log("getting here!!!!");
        }}
        > */}
        {/* HERE CHANGE THE COLOR DEPENDING IF THEY ARE ONLINE OR OFFLINE */}
        <h6>
          <i class="fas fa-circle  online"></i>
          {/* <i class="far fa-dot-circle online"></i> */}
          {/* <i class="bi bi-record-circle-fill online"></i> */}
          @Vladimir_1917
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  online"></i>
          {/* <i class="far fa-dot-circle online"></i> */}
          @cassidy_chmura
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  offline"></i>
          {/* <i class="bi bi-record-circle-fill offline"></i> */}
          @WernixUser01
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  offline"></i>
          @alejandra
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  online"></i>
          @user1999
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  offline"></i>
          @sullivan8492
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  online"></i>
          @free_willy_0000
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  offline"></i>
          @rchmura
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  online"></i>
          @rainy_daze00001111
        </h6>
      </Link>
      <Link>
        <h6>
          <i class="fas fa-circle  offline"></i>
          @onCloud9
        </h6>
      </Link>
      {/* pagination here */}
    </div>
  );
}
