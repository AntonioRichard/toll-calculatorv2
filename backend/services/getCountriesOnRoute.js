function getCountriesOnRoute(route) {
  let countries = [];

  route.legs[0].steps.forEach((step) => {
    if (step.instructions.includes("Entering")) {
      const country = step.instructions.split(" ").pop().slice(0, -6);
      !countries.includes(country) && countries.push(country);
    }
  });
  return countries;
}

module.exports = getCountriesOnRoute;
