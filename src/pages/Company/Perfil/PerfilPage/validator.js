import * as cnpjLib from "@fnando/cnpj";

export const validator = (name, value, state) => {
  const { fieldFalha } = state;
  switch (name) {
    case "razaoSocial":
    case "name":
      if (!value) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    case "rg":
      if (value && value.replace(/\W/gi, "").length !== 9) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };

    case "zipCode":
      if (value.replace(/\D/gi, "").length !== 8) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    case "cnpj":
      if (value && !cnpjLib.isValid(value)) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    case "nome":
      if (value === "") {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    case "email":
      if (
        value === "" ||
        // eslint-disable-next-line no-useless-escape
        !/^[\w_\-\.]+@[\w_\-\.]{2,}\.[\w]{2,}(\.[\w])?/.test(value)
      ) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    case "senha":
      if (value === "" || value.length < 5) {
        fieldFalha[name] = true;
      }
      return {
        fieldFalha
      };
    default:
      return {
        fieldFalha
      };
  }
};

export const masks = (name, valor) => {
  let value = valor;

  switch (name) {
    case "cnpj":
      value = value ? value : "";
      value = value.replace(/\D/gi, "");
      value = value.slice(0, 14);

      if (value.length > 2 && value.length <= 5) {
        value = value.replace(/(\d{2})(\d{3,})?/, "$1.$2");
      } else if (value.length > 5 && value.length <= 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3,})?/, "$1.$2.$3");
      } else if (value.length > 8 && value.length <= 12) {
        value = value.replace(/(\d{2})(\d{3})(\d{3})(\d{4,})?/, "$1.$2.$3/$4");
      } else if (value.length > 12) {
        value = value.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2,})?/,
          "$1.$2.$3/$4-$5"
        );
      }

      return {
        name,
        value
      };
    case "rg":
      value = value ? value : "";
      value =
        value.replace(/\D/gi, "").slice(0, 8) +
        value
          .replace(/[^(X|\d)]/gi, "")
          .slice(8, 9)
          .toUpperCase();

      if (value.length > 2 && value.length <= 5) {
        value = value.replace(/(\d{2})(\d{3,})?/, "$1.$2");
      } else if (value.length > 5 && value.length <= 8) {
        value = value.replace(/(\d{2})(\d{3})(\d{3,})?/, "$1.$2.$3");
      } else if (value.length > 8) {
        value = value.replace(
          /(\d{2})(\d{3})(\d{3})([(X|\d)]{1})/,
          "$1.$2.$3-$4"
        );
      }

      return {
        name,
        value
      };
    case "phone":
      value = value.replace(/\D/gi, "").slice(0, 11);

      if (value.length > 0 && value.length <= 2) {
        value = value.replace(/(\d{1,2})/, "($1");
      } else if (value.length > 2 && value.length <= 6) {
        value = value.replace(/(\d{2})(\d{4})?/, "($1) $2");
      } else if (value.length > 6 && value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, "($1) $2-$3");
      }
      if (value.length === 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{1,4})/, "($1) $2-$3");
      }

      return {
        name,
        value
      };
    case "zipCode":
      value = value.replace(/\D/gi, "");
      value = value.slice(0, 8);

      if (value.length > 5) {
        value = value.replace(/(\d{5})(\d{3,})?/, "$1-$2");
      }
      return {
        name,
        value
      };
    case "number":
      value = value.replace(/\D/gi, "");
      value = value.slice(0, 8);

      return {
        name,
        value
      };
    case "state":
      value = value.toUpperCase();
      value = value.replace(/[^A-Z]/gi, "");
      value = value.slice(0, 2);

      return {
        name,
        value
      };
    default:
      return {
        name,
        value
      };
  }
};
