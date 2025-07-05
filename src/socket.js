import { io } from "socket.io-client";

const socket = io("https://server-kbh2.onrender.com/", {
  withCredentials: true,
});

export default socket;
