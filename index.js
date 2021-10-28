const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
// When you go to dev tools in the Header section of your browser you can see
// X-RateLimit-Limit and X-RateLimit-Remaining
const limiter = rateLimit({
  //Only 5 requests allowed in 10 minutes
  windowMs: 10 * 60 * 1000,
  max: 5,
});

app.use(limiter);
app.set("trust proxy", 1);

// Set static folder
app.use(express.static("public"));

// Routes
// since we want ./routes/index we can leave out the "index" bit
app.use("/api", require("./routes"));

// Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
