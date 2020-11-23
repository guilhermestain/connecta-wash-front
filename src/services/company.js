import api from "./api";

export const profileUpdate = async value => {
  let response = {};
  await api
    .put("/api/company", value)
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

export const getById = async value => {
  let response = {};
  await api
    .get("/api/company/ById", { params: value })
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
