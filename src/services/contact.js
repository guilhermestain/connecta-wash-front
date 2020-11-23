import api from "./api";

export const contactUpdate = async value => {
  let response = {};
  await api
    .put("/api/contact", value)
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
