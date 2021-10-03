import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { api, helpers, contexts, constants } from "../utils";
import _ from "lodash";
const { UserContext } = contexts;


export default function Friends(props) {

  const userCtx = useContext(UserContext);

  // function linkifyFriend(currentUsername) {
  //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ", userCtx.friends);
  //   return( 
  //     <Link
  //       onClick={() => {
  //         props.setUserModalOpen(!props.userModalOpen);
  //         props.setUsernameChosen(currentUsername);
  //       }}
  //     >
  //       {/* now need to be able to determine if friend is online */}
  //       <h6>
  //         <i class="fas fa-circle  online"></i>
  //         {currentUsername}
  //       </h6>
  //     </Link>);
  // }

  // function getFriends() {
  //   let listOfFriends = userCtx.currentUser
  //     ? userCtx.currentUser.friends.length == 0
  //       ? []
  //       : userCtx.currentUser.friends.split(",")
  //     : [];

  //   return _.map(listOfFriends, linkifyFriend)
  // }

  function linkifyFriend(currentFriend) {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA ", userCtx.friends);
    return( 
      <Link
        onClick={() => {
          props.setUserModalOpen(!props.userModalOpen);
          props.setUsernameChosen(currentFriend?.username);
          props.setFriendChosen(currentFriend)
        }}
      >
        {/* now need to be able to determine if friend is online */}
        <h6>
          {currentFriend?.is_online ? <i class="fas fa-circle online"></i> : <i class="fas fa-circle offline"></i> }
          {currentFriend?.username}
        </h6>
      </Link>);
  }

  // function getFriends() {
  //   return _.map(userCtx?.friends, linkifyFriend)
  // }
  return (
    <div className="friends-list">
  
      {/* {getFriends()} */}
      {_.map(userCtx?.friends, linkifyFriend)}

      
      {/* <Link>
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
      </Link> */}
      {/* pagination here */}
    </div>
  );
}
