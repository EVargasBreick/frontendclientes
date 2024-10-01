import axios from "axios";

const endpoint =
  process.env.REACT_APP_TYPE == "LOCAL"
    ? process.env.REACT_APP_ENDPOINT_URL_TEST
    : process.env.REACT_APP_ENDPOINT_URL;
const port =
  process.env.REACT_APP_TYPE == "LOCAL"
    ? process.env.REACT_APP_ENDPOINT_PORT_TEST
    : process.env.REACT_APP_ENDPOINT_PORT;

const composedUrl = `${endpoint}:${port}`;
console.log("Tipo de corrida", `.${process.env.REACT_APP_TYPE}.`);
console.log("Composed URL", composedUrl);

const getClientPoints = async (code) => {
  try {
    const response = await axios.get(
      `${composedUrl}/v1/club/puntos_cliente?code=${code}`
    );
    if (response.status === 200) {
      return response;
    } else {
      return Promise.reject(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
export { getClientPoints };
