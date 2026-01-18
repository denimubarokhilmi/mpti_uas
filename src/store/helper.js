import { APIURL } from "@/main.js";
// import { showLoading, hideLoading } from "@/store/loadingStore.js";
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const callAPI = async (path, payload, methods) => {
  try {
    const token = document.cookie;
    const splitsToken = token.split("=")[1];
    const url = APIURL;
    const isFormData = payload instanceof FormData;

    const options = {
      method: methods,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${splitsToken}`,
      },
      body: isFormData ? payload : JSON.stringify(payload),
    };
    if (!isFormData) {
      options.headers["Content-Type"] = "application/json";
    }
    if (payload.length === 0) {
      delete options.body;
    }
    // showLoading();
    const res = await fetch(`${url}${path}`, options);

    // await delay(1000);
    if (!res.ok) throw res;
    return res.json();
  } catch (error) {
    // throw await error.json();
    throw error;
  }
  // finally {
  //   hideLoading();
  // }
};

const sweet_alert_response_success = (message) => {
  window.Swal.fire({
    title: "Success!",
    text: `${message}`,
    icon: "success",
    confirmButtonText: "Oke",
  });
};

const sweet_alert_response_error = (message) => {
  window.Swal.fire({
    title: "Opps!",
    text: `${message}`,
    icon: "error",
    confirmButtonText: "Oke",
  });
};
export { callAPI, sweet_alert_response_error, sweet_alert_response_success };
