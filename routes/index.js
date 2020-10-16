var express = require("express");
var router = express.Router();

var shortid = require("shortid");
var valid_url = require("valid-url");
var URL_data = require("../models/URL_data");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "URL Shortener" });
});

router.post("/api/shorturl/new", async function (req, res) {
  let longURL = req.body.longURL;
  if (!valid_url.isUri(longURL)) {
    res.json({ message: "Invalid URL" });
  }
  let shortcode = shortid.generate();
  let shortURL = req.get("host") + "/api/shorturl/" + shortcode;
  let exists = await URL_data.findOne({ long_URL: longURL });
  if (exists) {
    res.status(200).send("URL Already exists");
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

router.get("/api/shorturl/:shortcode", async function (req, res) {
  let shortcode = req.params.shortcode.toString();
  console.log(shortcode);
  let exists = await URL_data.findOne({ shorthand: shortcode });
  if (!exists) {
    res.json({ message: "Shortcode does not exist" });
  } else {
    res.redirect(exists.long_URL);
  }
});
module.exports = router;
