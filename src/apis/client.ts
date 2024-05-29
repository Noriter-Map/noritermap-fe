import axios from "axios";

export const client = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
  baseURL: process.env.REACT_APP_BASEURL,
});

export const local = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
  withCredentials: true,
  baseURL: process.env.REACT_APP_LOCAL_URL,
});
