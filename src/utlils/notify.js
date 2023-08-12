import { toast } from "react-toastify";

const notifyError = (msg) => {
  toast.error(<strong>{msg}</strong>, {
    position: "top-center",
  });
};

const notifySuccess = (msg) => {
  toast.success(<strong>{msg}</strong>, {
    position: "top-center",
  });
};

export { notifyError, notifySuccess };
