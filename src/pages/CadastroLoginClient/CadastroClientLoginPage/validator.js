export const validator = (name, value, state) => {
  const { fieldFalha } = state;
  switch (name) {
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
