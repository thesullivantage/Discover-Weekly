const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trackSchema = new Schema({

  Album: {type: String, required: false},
  Artists: [],
  Name: { type: String, required: true },
  URI: {type: String, required: false},

});

const Tracks = mongoose.model("Tracks", trackSchema);

module.exports = Tracks;
