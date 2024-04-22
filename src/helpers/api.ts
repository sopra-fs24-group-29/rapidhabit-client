import axios, { AxiosError } from "axios";
import { getDomain } from "./getDomain";

export const api = axios.create({
  baseURL: getDomain(),
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const handleError = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return alert(
      "An unknown error occurred. Please refresh the page and try again."
    );
  }
  const response = error.response;

  if (response && !!RegExp(/^[4|5]\d{2}$/).exec(response.status.toString())) {
    console.log(
      "The request was made and answered but was unsuccessful.",
      error.response
    );
    if (response.data.message) {
      return response.data.message;
    }
    return response.statusText;
  } else {
    if (RegExp(/Network Error/).exec(error.message)) {
      alert("The server cannot be reached.\nDid you start it?");
    }
    console.log("Something else happened.", error);
    return error.message;
  }
};
