import { APIURL } from "@/main.js";
// import { showLoading, hideLoading } from "@/store/loadingStore.js";
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const callAPI = async (path, payload, methods) => {
  try {
    const token = document.cookie;
    const splitsToken = token.split("=")[1];
    const url = APIURL;

    const options = {
      method: methods,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${splitsToken}`,
      },
      body: JSON.stringify(payload),
    };

    // showLoading();
    const res = await fetch(`${url}${path}`, options);

    // await delay(1000);
    if (!res.ok) throw res;
    return res.json();
  } catch (error) {
    throw await error.json();
  }
  //   finally {
  //     // hideLoading();
  //   }
};

const response_success = (message) => {
  window.Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonText: "Oke",
  });
};

const response_error = (message) => {
  window.Swal.fire({
    icon: "error",
    title: "Oppss...",
    text: message,
    confirmButtonText: "Oke",
  });
};
export { callAPI, response_success, response_error };
