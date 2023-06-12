const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const RDVSchema = new Schema({
  Client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },

  time: {
    type: Date,
    default: Date.now,
  },


});

const RDV = mongoose.model("RDV", RDVSchema);

module.exports = RDV;