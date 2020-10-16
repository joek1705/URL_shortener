var express = require("express");
var router = express.Router();

var shortid = require("shortid");
var valid_url = require("valid-url");
const { deleteOne } = require("../models/URL_data");
var URL_data = require("../models/URL_data");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/shorturl/new", async function (req, res) {
  let longURL = req.body.longURL;
  if (!valid_url.isUri(longURL)) {
    res.json({ message: "Invalid URL" });
  }
  let shortcode = shortid.generate();
  let shortURL = "/api/shorturl/" + shortcode;
  let exists = await URL_data.findOne({ long_URL: longURL });
  if (exists) {
    res.status(200).send();
  } else {
    let newURL = URL_data({
      long_URL: longURL,
      short_URL: shortURL,
      shorthand: shortcode,
    });
    await newURL.save();
    res.json(newURL);
  }
  //add url to database
});

router.get("/api/shorturl/:id", function (req, res) {
  res.send(req.params.id);
});
module.exports = router;
