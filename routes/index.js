const express = require("express");
const router = express.Router();
// needle would be doing a job simular to node fetch but you can use common JS syntax
const needle = require("needle");

router.get("/", (req, res) => {
  //   res.json({ success: true });
});

module.exports = router;
