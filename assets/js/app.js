import React, { useState, useContext, useEffect, Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import _ from "lodash";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import { Socket } from "phoenix";
import { api, constants, helpers, contexts } from "./utils";
import {
  Admin,
  Chat,
  Dashboard,
  Home, // I ADDED THIS
  Layout,
  Login, // I ADDED THIS
  Profile,
  Register,
  Settings,
  SignIn,
  User,
  Users,
  ReferenceDataList,
  ResetPassword,
  ForgotPassword,
  UpdatePassword,
  UserProfile,
  Video,
} from "./pages";
const { UserContext, SocketContext } = contexts;
import "../css/app.scss";

const nowTime = () => new Date().getTime();
window.lastActivityCheckedAt = nowTime();

const CHANNEL_MAX_AGE = 60 * 60000 * 1; // might set this differently
// for app that runs 24/7

export default function App() {
  const userCtx = useContext(UserContext);
  const socketCtx = useContext(SocketContext);

  const tokenFromStorage = api.userToken() || null;
  if (tokenFromStorage) {
    window.authToken = tokenFromStorage;
  }
  const parsedUser = tokenFromStorage
    ? JSON.parse(localStorage.getItem("currentUser"))
    : null;
  const isImpersonating = localStorage.getItem("adminToken") ? true : false;
  const [authToken, setAuthToken] = useState(tokenFromStorage);
  const [currentUser, setCurrentUser] = useState(parsedUser);
  const [impersonating, setImpersonation] = useState(isImpersonating);
  const [alertMessage, setAlertMessage] = useState(null);
  const [signInMessageVisible, setSignInMessageVisible] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/login");

  // socket / channel items
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    window.addEventListener("click", setLastActivity);
    startTimer();
    if (nowTime() - window.lastActivityCheckedAt < constants.TEN_SECONDS_MS)
      return;
    compareTimerToLastActivity();
  }, []);

  // does this useEffect() really do anything?
  // useEffect(() => {
  //   console.log("GETTING HERE YAYYYYYYYYYYYYYYYYY");
  //   setCurrentUser(userCtx.currentUser);
  // }, [userCtx.currentUser]);

  function startTimer() {
    if (window.lastActivityIntervalId) {
      try {
        window.clearInterval(window.lastActivityIntervalId);
      } catch {}
    }
    window.lastActivityIntervalId = window.setInterval(
      compareTimerToLastActivity,
      constants.FIVE_MINUTES_MS
    );
    verifyAuthentication();
  }

  function compareTimerToLastActivity() {
    window.lastActivityCheckedAt = nowTime();
    const lastActivity = localStorage.getItem("lastActivity");
    if (!lastActivity) return;
    if (nowTime() - parseInt(lastActivity, 10) > constants.TWENTY_MINUTES_MS) {
      signOut(
        "You have been logged out due to inactivity. Please log back in to continue."
      );
    }
    verifyAuthentication();
  }

  function verifyAuthentication() {
    const sessionStartedAt = localStorage.getItem("sessionStartedAt");
    if (
      !authToken ||
      !sessionStartedAt ||
      nowTime() - sessionStartedAt < constants.TWENTY_MINUTES_MS
    ) {
      return; // not logged in or < 20 min since logon, no need to verify anything
    }
    if (nowTime() - sessionStartedAt > constants.TWENTY_THREE_HOURS_MS) {
      console.log("Session timeout");
      signOut("Your session has timed out.  Please log in.");
    } else {
      api
        .fetch("auth_check/" + nowTime())
        .then((r) => {
          if (!r.data.success) {
            signOut("Your session has timed out.  Please log in.");
          }
        })
        .catch((e) => {
          console.error("Failed auth check", e);
          signOut("Your session has timed out.  Please log in.");
        });
    }
  }

  function setLastActivity() {
    if (!authToken || !localStorage.getItem("token")) {
      // not logged in, clean up and do nothing
      if (localStorage.getItem("lastActivity")) {
        localStorage.removeItem("lastActivity");
      }
      return;
    }
    localStorage.setItem("lastActivity", nowTime());
    if (alertMessage) {
      setAlertMessage(null);
    }
  }

  function isAuthenticated() {
    return authToken !== null;
  }

  function enhanceUser(u) {
    if (!u) return u;
    // if (u.roles && Array.isArray(u.roles)) {
    //   u.is_dock_supervisor = u.roles.includes(constants.ROLE_NAMES.DOCK_SUPERVISOR);
    // }
    if (u.token) {
      delete u.token;
    }
    return u;
  }

  function impersonate(user, impersonateToken) {
    if (impersonating) {
      return; // do not allow impersonation a 2nd time if we're already in that mode
    }
    // remember the admin user's details
    const adminUser = JSON.parse(localStorage.getItem("currentUser"));
    const adminUserToken = localStorage.getItem("token");
    // clear localstorage
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    // set the impersonation details
    user = enhanceUser(user);
    localStorage.setItem("token", impersonateToken);
    window.authToken = impersonateToken;
    localStorage.setItem("currentUser", JSON.stringify(user));
    // remember the admin details for later
    localStorage.setItem("adminToken", adminUserToken);
    localStorage.setItem("adminUser", JSON.stringify(adminUser));
    setCurrentUser(user);
    setAuthToken(impersonateToken);
    setImpersonation(true);
    window.location.pathname = "/home";
  }

  function clearImpersonation() {
    if (!impersonating) {
      return; // do not allow clear of the primary user if we're not impersonating
    }
    // get the original admin user
    const adminUser = JSON.parse(localStorage.getItem("adminUser"));
    const adminUserToken = localStorage.getItem("adminToken");
    // clear localstorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    // set the admin user back as primary
    localStorage.setItem("token", adminUserToken);
    window.authToken = adminUserToken;
    localStorage.setItem("currentUser", JSON.stringify(adminUser));
    localStorage.setItem("untethering", true);
    setCurrentUser(adminUser);
    setAuthToken(adminUserToken);
    setImpersonation(false);
  }

  function signOut(message) {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("lastActivity");
    localStorage.removeItem("sessionStartedAt");
    window.authToken = null;
    setCurrentUser(null);
    setAuthToken(null);
    if (message) {
      setAlertMessage(message);
      setSignInMessageVisible(true);
    }

    if (impersonating) {
      clearImpersonation();
    }

    // MAYBE NEED TO REDIRECT TO HOME PAGE????
    // <Redirect to={`/`} />;
    // return <Redirect to={`/user_profile`} />;
  }

  const AuthRoute = ({ component: Component, ...extraProps }) => {
    return (
      <Route
        {...extraProps}
        render={(props) => {
          const combinedProps = Object.assign(props, extraProps);
          if (helpers.mustChangePassword(currentUser)) {
            return <UpdatePassword {...extraProps} currentUser={currentUser} />;
          }
          if (!isAuthenticated()) {
            return <Redirect to="/" />;
          }
          // if (!currentUser?.accepted_tnc) {
          //   return (<TermsAndConditions {...combinedProps} />);
          // }
          return (
            <Layout {...combinedProps}>
              <Component {...combinedProps} />
            </Layout>
          );
        }}
      />
    );
  };

  const AuthorizedRoute = ({ component: Component, ...extraProps }) => {
    return (
      <Route
        {...extraProps}
        render={(props) => {
          const combinedProps = Object.assign(props, extraProps);
          if (helpers.mustChangePassword(currentUser)) {
            return <UpdatePassword {...extraProps} currentUser={currentUser} />;
          }
          if (!isAuthenticated()) {
            // return <Redirect to="/" />;
            return <Redirect to={redirectTo} />;
            // but if we just logged out I want to redirect to home :(
            // how can i eat my cake and have it too?
            // there must be a way
            // figured it out (using redirect state)
          }
          // if (!currentUser?.accepted_tnc) {
          //   return (<TermsAndConditions {...combinedProps} />);
          // }
          return <Component {...combinedProps} />;
        }}
      />
    );
  };

  const LoginRoute = ({ component: Component, ...extraProps }) => {
    return (
      <Route
        {...extraProps}
        render={(props) => {
          const combinedProps = Object.assign(props, extraProps);
          if (isAuthenticated()) {
            // NEED TO DIRECT TO PARTICULAR USER HERE -> this is what happens after logged in successfully
            // WHY ARE THESE NOT BEING SET?????????????
            // console.log("cntx!!!!!!!!!!!", userCtx);
            // console.log("current user!!!!!!!!!!!!!!!!!!", currentUser);
            // return <Redirect to={`/user_profile/${currentUser?.first_name}`} />;
            return <Redirect to={`/user_profile`} />;
          }
          if (
            (_.startsWith(combinedProps.path, "/reset_password") ||
              _.startsWith(combinedProps.path, "/forgot_password") ||
              _.startsWith(combinedProps.path, "/login") ||
              _.startsWith(combinedProps.path, "/register")) &&
            Component
          ) {
            return <Component {...combinedProps} />;
          }
          // return <SignIn {...combinedProps} />;
          return <Home />;
        }}
      />
    );
  };

  const referencePathList = _.map(
    constants.REFERENCE_DATA_URL_LIST,
    (x) => x.reactPath
  );
  const showSidebar = userCtx && currentUser && currentUser.id;

  function addPhotoToUser(photo_url) {
    let update = Object.assign({}, currentUser);
    update.image_url = photo_url;
    update = enhanceUser(update);
    localStorage.setItem("currentUser", JSON.stringify(update));
    setCurrentUser(update);
  }

  function signUserIn(newUser, token) {
    if (token) {
      localStorage.setItem("token", token);
      setAuthToken(token);
      window.authToken = token;
    }
    newUser = enhanceUser(newUser);
    // THIS IS WHERE THE LOCAL STORAGE STUFF IS BEING SET
    localStorage.setItem("lastUsername", newUser.username);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("lastActivity", nowTime());
    localStorage.setItem("sessionStartedAt", nowTime());
    // okay following now, but how is setting currentUser changing the context so it is all available in other pages?
    // i think because of const user currentUser: currentUser, so when currentUser is changed all of the context is changed because UseContext was set to value of user
    setCurrentUser(newUser);
    setAlertMessage(null);
  }

  const user = {
    currentUser: currentUser,
    // changeCurrentUser: setCurrentUser, // I added this
    impersonating: impersonating,
    impersonate: impersonate,
    clearImpersonation: clearImpersonation,
    // fullScreenDashboard: fullScreenDashboard,
    // toggleFullScreenDashboard: toggleFullScreenDashboard,
    signIn: signUserIn,
    signOut: signOut,
    addPhotoToUser: addPhotoToUser,
  };

  // SOCKET FUNCTIONALITY
  useEffect(() => {
    if (authToken) {
      joinOrCreateSocket();
    }
  }, [authToken]);

  var unregisterChannels = (removeList) => {
    if (removeList && removeList.length > 0) {
      const socketExists = socket && socket.conn;
      if (socketExists && socket.channels && socket.channels.length > 0) {
        _.forEach(removeList, function (chnl) {
          const channel = _.find(socket.channels, { topic: chnl });
          if (!channel) {
            console.warn(`channel ${chnl} not found`);
            return;
          }
          channel.leave();
        });
      } else {
        try {
          socket.disconnect();
        } catch (error) {
          console.warn(error);
        }
      }
    }
    // setActiveChannels(JSON.stringify(currentChannels));
  };

  const joinOrCreateSocket = () => {
    const jwt = authToken;
    if (!jwt) {
      return null;
    }
    const socket_host =
      process.env.NODE_ENV === "development"
        ? "localhost:4000"
        : window.location.hostname;

    const socket_protocol =
      process.env.NODE_ENV === "development" ? "ws" : "wss";

    const socket = new Socket(`${socket_protocol}://${socket_host}/socket`, {
      params: { guardian_token: jwt },
    });
    socket.connect();
    setSocket(socket);
    return;
  };

  function getChannel(topic) {
    if (!socket) {
      return null;
    }
    const channel = socket.channel(topic, {});
    return channel;
  }

  function createNewChannel(channelTopic, callback, type) {
    if (!socket) {
      return null;
    }

    const channel = getChannel(channelTopic);
    if (channel) {
      channel
        .join()
        .receive("ok", (_resp) => {
          return channel;
        })
        .receive("error", (_resp) => {
          return null;
        });

      if (!Array.isArray(type)) {
        channel.on(type, (m) => {
          callback(m);
        });
      } else {
        _.each(type, (t) => {
          channel.on(t, (m) => {
            callback(m);
          });
        });
      }
      return channel;
    }
  }

  function joinOrCreateChannel(channelTopic, callbackFunction, type) {
    const foundChannel = _.find(socket.channels, function (chnl) {
      return channelTopic === chnl.topic;
    });
    return socket &&
      socket.channels &&
      socket.channels.length > 0 &&
      foundChannel
      ? foundChannel
      : createNewChannel(channelTopic, callbackFunction, type);
  }

  function pushChannelBroadcast(channel, channelSubTopic, channelObject) {
    if (!channel.push) {
      channel = joinOrCreateChannel(channel);
    }
    channel.push(channelSubTopic, channelObject);
  }

  function manageSocket(channelTopic, callback, type) {
    if (!socket && currentUser) {
      joinOrCreateSocket();
    }

    if (socket) {
      const channelToAdd = joinOrCreateChannel(channelTopic, callback, type);
      if (channelToAdd) {
        socket.channels.push(channelToAdd);
      }
    }
  }

  const socketInfo = {
    socket: socket,
    setSocket: setSocket,
    joinOrCreateChannel: joinOrCreateChannel,
    createNewChannel: createNewChannel,
    pushChannelBroadcast: pushChannelBroadcast,
    getChannel: getChannel,
    manageSocket: manageSocket,
  };

  return (
    <div className="siteContainer fullHeight">
      <Alert
        effect="slide"
        position="top-right"
        stack={{ limit: 1 }}
        timeout={4000}
        html={true}
        offset={1}
        z-index={4000}
        preserveContext
      />
      <SocketContext.Provider value={socketInfo}>
        <UserContext.Provider value={user}>
          {/* I ADDED APP AS A CLASSNAME */}
          <div className="contentWithHeader App">
            <Switch>
              <LoginRoute exact path="/" />
              <LoginRoute path="/login" component={Login} />
              <LoginRoute path="/forgot_password" component={ForgotPassword} />
              <LoginRoute path="/register" component={Register} />
              <LoginRoute
                path="/reset_password/:resetToken"
                component={ResetPassword}
              />

              <AuthorizedRoute
                exact
                // path contains primary key (id) of user in question
                path="/user_profile"
                component={UserProfile}
                setRedirectTo={setRedirectTo}
              />
              <AuthorizedRoute
                exact
                path="/settings"
                component={Settings}
                setRedirectTo={setRedirectTo}
              />
              <AuthorizedRoute
                exact
                path="/video"
                component={Video}
                setRedirectTo={setRedirectTo}
              />
              <AuthorizedRoute
                exact
                path="/chat"
                component={Chat}
                setRedirectTo={setRedirectTo}
              />

              <AuthRoute exact path="/home" component={Dashboard} />
              <AuthRoute exact path="/admin" component={Admin} />
              <AuthRoute exact path="/profile" component={Profile} />
              <AuthRoute path="/user/:id" component={User} />
              <AuthRoute path="/users" component={Users} />
              <AuthRoute
                exact
                path={referencePathList}
                component={ReferenceDataList}
              />
            </Switch>
          </div>
        </UserContext.Provider>
      </SocketContext.Provider>
    </div>
  );
}
