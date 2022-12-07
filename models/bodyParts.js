const mongoose = require("mongoose");
const BodySchema = mongoose.Schema({
  name_part: {
    type: String,
    require: true, 
  },
  location: {
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("BodyPart", BodySchema);