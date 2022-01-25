const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  
    const options = {
    method: "GET",
    hostname: "covid-19-data.p.rapidapi.com",
    port: null,
    path: "/country?name=" + req.body.countryName,
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "5669e2406amsh5045068f0e10898p11e6b8jsn55fbddf92a13",
      useQueryString: true,
    },
  };

  https.get(options, function (response) {
    const chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
      const covidData = JSON.parse(chunks);
      const confirmedCases = covidData[0].confirmed;
      const recoveredCases = covidData[0].recovered;
      const criticalCases = covidData[0].critical;
      const deaths = covidData[0].deaths;
      const nameOfCountry = covidData[0].country;

      res.send(
        "Following is the COVID-19 data for " +
          req.body.countryName +
          ". Confirmed Cases: " +
          confirmedCases +
          ". Recovered Cases: " +
          recoveredCases +
          ". Critical Cases: " +
          criticalCases +
          ". Deaths: " +
          deaths
      );
    });
  });
});

app.listen(3000, () => {
  console.log("server is up and runnning at port 3000");
});
