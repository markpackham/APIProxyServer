const url = require("url");
const express = require("express");
const router = express.Router();
// needle would be doing a job simular to node fetch but you can use common JS syntax
const needle = require("needle");
const apicache = require("apicache");

// Env vars
// For this to work we need a .env file
// API details from that file come from here https://openweathermap.org/current
// Holds stuff like this
// API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
// API_KEY_NAME = "appid"
// API_KEY_VALUE = "[My Api Key]"
// Example of an API query, http://localhost:5000/api?q=Chicago
// When adding environment variables you need to restart the server
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
let cache = apicache.middleware;

// If you look in Headers you'll see cache-control with "max-age=120" (2 minutes or 120 seconds)
router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    // URLSearchParams saves us from having to write a very ugly looking url
    const apiRes = await needle("get", `${API_BASE_URL}?${params}`);
    const data = apiRes.body;

    // Log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
