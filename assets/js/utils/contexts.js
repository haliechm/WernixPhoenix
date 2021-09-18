import React from "react";

const UserContext = React.createContext({
  currentUser: null,
  theme: null,
  fullScreenDashboard: false,
  authCurrentUser: i => {},
  setTheme: i => {},
  signIn: (user, token) => {},
  signOut: i => {},
  impersonate: i => {},
  clearImpersonation: i => {},
  toggleFullScreenDashboard: i => {},
  addPhotoToUser: i => {}
});

const SocketContext = React.createContext({
  socket: null,
  setSocket: i => {},
  joinOrCreateChannel: i => {},
  createNewChannel: i => {},
  pushChannelBroadcast: i => {},
  getChannel: i => {},
  manageSocket: i => {}
});

const contexts = {
  UserContext: UserContext,
  SocketContext: SocketContext
}

export default contexts;
