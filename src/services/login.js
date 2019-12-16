import api from "./api";

export const login = async value => {
  let response = {};
  await api
    .post("/oapi/login", value)
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

export const logout = async token => {
  await api.delete("/oapi/logout", { params: { token } });

  return true;
};

export const auth = async value => {
  let response = null;

  await api
    .get("/oapi/auth", { params: value })
    .then(resp => {
      response = resp;
    })
    .catch(error => {
      if (error.response) {
        response = error.response;
      } else {
        console.log("Error", error.message);
      }
    });

  return response;
};
