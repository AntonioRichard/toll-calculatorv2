const fetchData = require("../api/fetchTollData");
const vignetteCountries = require("../utils/vignetteCountries");
const db = require("../firebase/firebaseConfig");
const getCountriesOnRoute = require("../services/getCountriesOnRoute");
let vignettes = [];

const newRoute = async (req, res) => {
  const { origin, destination } = req.body;
  const result = await fetchData(origin, destination);
  let totalVignetteCostPerRoute = [];
  let nrOfVignettesPerRoute = [];
  let cheapest = Infinity;
  let routeNr = 0;

  if (result.response) {
    res.send(result);
    return;
  }

  if (vignettes.length !== 0) {
    vignettes.forEach((route) => {
      let vignetteCosts = 0;
      route.forEach((country) => {
        vignetteCosts += country.costs;
      });
      totalVignetteCostPerRoute.push(vignetteCosts);
      nrOfVignettesPerRoute.push(route.length);
    });
  }

  result.map(async (route, idx) => {
    if (nrOfVignettesPerRoute.length !== 0) {
      route.summary.nrOfVignettesPerRoute = nrOfVignettesPerRoute[idx];
    }

    if (route.summary.hasTolls) {
      const totalCostInEur = route.costs.cash * route.rates;

      if (vignettes.length !== 0) {
        if (totalCostInEur) {
          route.costs.cash = totalCostInEur + totalVignetteCostPerRoute[idx];
          if (cheapest > route.costs.cash) {
            cheapest = route.costs.cash;
            routeNr = idx;
          }
        }
      } else {
        if (totalCostInEur) {
          route.costs.cash = totalCostInEur;
          if (cheapest > route.costs.cash) {
            cheapest = route.costs.cash;
            routeNr = idx;
          }
        }
      }

      route.tolls.map(async (toll) => {
        const costInEur = toll.cashCost * route.rates;
        costInEur && (toll.cashCost = costInEur);
        toll.currency = "EUR";
      });
    } else {
      if (vignettes.length !== 0) {
        route.summary.tollCosts = totalVignetteCostPerRoute[idx];
        if (cheapest > route.summary.tollCosts) {
          cheapest = route.summary.tollCosts;
          routeNr = idx;
          console.log("+", cheapest);
        }
      } else {
        route.summary.tollCosts = 0;
        cheapest = 0;
        routeNr = idx;
      }
    }
  });

  result.forEach((route) => {
    route.summary.cheapestRoute = routeNr;
  });

  res.status(200).send(result);
};

const searchVignettes = async (req, res) => {
  const { routes } = req.body;
  let countriesOnRoute = [];
  vignettes = [];

  routes.forEach((route) => {
    countriesOnRoute.push(getCountriesOnRoute(route));
  });

  countriesOnRoute.forEach((route) => {
    let vignetteCountriesOnRoute = [];

    vignetteCountries.forEach((vignetteCountry) => {
      if (route.includes(vignetteCountry.countryName)) {
        vignetteCountriesOnRoute.push(vignetteCountry);
      }
    });

    vignettes.push(vignetteCountriesOnRoute);
  });

  res.send(vignettes);
};

const addToFavorites = async (req, res) => {
  const { route, uid } = req.body;
  if (route && uid) {
    db.ref(
      `users/${uid}/favorites/${route.origin} - ${route.destination}`
    ).update({
      route,
    });

    res.send("Route added to favorites");
  }
};

const getFavoriteRoutes = async (req, res) => {
  const uid = req.headers.uid;
  db.ref(`users/${uid}/favorites`)
    .once("value")
    .then((snapshot) => {
      const data = snapshot.val();

      res.send(data);
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });
};

const removeFromFavorites = async (req, res) => {
  const { route, uid } = req.body;
  db.ref(`users/${uid}/favorites/${route}`)
    .remove()
    .then(() => {
      console.log("route deleted");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  newRoute,
  searchVignettes,
  addToFavorites,
  getFavoriteRoutes,
  removeFromFavorites,
};
