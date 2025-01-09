import axios from "axios";
//import { toast } from "react-toastify";

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        console.log(val.description)
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        console.log(err.data.errors[e][0])
      }
    } else if (err?.data) {
      console.log(err.data)
    } else if (err?.status === 401) {
      console.log("2")
      window.history.pushState({}, "LoginPage", "/user/login");
    } else if (err) {
      console.log(err)
    }
  }
};
