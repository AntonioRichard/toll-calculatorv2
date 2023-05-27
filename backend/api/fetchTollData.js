require("dotenv").config();
const axios = require("axios");
const url = "https://dev.TollGuru.com/v1/calc/gmaps";

const fetchTollData = async (origin, destination) => {
  if (origin && destination !== "")
    try {
      const { data } = await axios.post(
        url,
        {
          from: {
            address: origin,
          },
          to: {
            address: destination,
          },
          units: {
            currencyUnit: "USD",
          },
        },
        {
          headers: {
            "x-api-key": process.env.REACT_APP_TOLLGURU_API_KEY,
          },
        }
      );
      data.routes.forEach((route) => {
        route.rates = data.summary.rates.EUR;
      });
      return data.routes;
    } catch (error) {
      return error;
    }
};

module.exports = fetchTollData;
