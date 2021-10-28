// For this to work we need a .env file
// API details from that file come from here https://openweathermap.org/current
// Holds stuff like this
// API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
// API_KEY_NAME = "appid"
// API_KEY_VALUE = "[My Api Key]"

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Routes
// since we want ./routes/index we can leave out the "index" bit
app.use("/api", require("./routes"));

// Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
