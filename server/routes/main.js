const express = require("express");
const router = express.Router();

// Routes

router.get("/", (req, res) => {
  res.send("Meus Poemas");
});

module.exports = router;
