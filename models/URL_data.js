let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let URL_data = new Schema({
  long_URL: {
    type: String,
    required: true,
  },
  short_URL: {
    type: String,
    required: true,
  },
  shorthand: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("URL_data", URL_data);
