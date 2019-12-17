import api from "./api";

export const creatrUser = async value => {
  let response = {};
  await api
    .post("/oapi/user", value)
    .then(resp => {
      response = resp;
    })
    .catch(err => {
      if (err.response) {
        response = err.response;
      } else {
        console.log("Error", err.message);
      }
    });

  return response;
};

export const checkAccount = async value => {
  let response = {};
  await api
    .post("/oapi/user/check", value)
    .then(resp => {
      response = resp;
    })
    .catch(err => {
      if (err.response) {
        response = err.response;
      } else {
        console.log("Error", err.message);
      }
    });

  return response;
};
