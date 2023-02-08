const fetchData = require("../api/fetchData");

const getTolls = async (req, res) => {
  const { origin, destination } = req.body;
  console.log(origin, destination);
  const result = await fetchData(origin, destination);
  res.send(result);
};

module.exports = getTolls;
