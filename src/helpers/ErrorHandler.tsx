import axios from "axios";
import { message } from 'antd'

export const handleError = (error: any) => {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        message.error(val.description);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        message.error(err.data.errors[e][0]);
      }
    } else if (err?.data) {
      console.log(err.data)
    } else if (err?.status === 401) {
      message.error('Error')
      window.history.pushState({}, "LoginPage", "/user/login");
    } else if (err) {
      message.error('Error')
    }
  }
};
