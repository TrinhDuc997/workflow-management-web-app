import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.REACT_APP_API_URL;

export const socket = io(URL, {
  reconnectionAttempts: 5,
  reconnection: false,
  reconnectionDelay: 5000,
  timeout: 60000,
});
