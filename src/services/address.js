import axios from "axios";

import api from "./api";

const url = cep => `https://viacep.com.br/ws/${cep}/json/`;

export const getAddressByZipCode = cep => {
  return axios.get(url(cep.replace(/\D+/g, "")));
};

export const createAddress = async value => {
  let response = {};
  await api
    .post("/api/address", value)
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
