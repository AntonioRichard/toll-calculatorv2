const fetchData = require("../api/fetchTollData");

const getTolls = async (req, res) => {
  const { origin, destination } = req.body;
  const result = await fetchData(origin, destination);
  res.send(result);
};

module.exports = getTolls;
