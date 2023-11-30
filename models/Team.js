const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


const Team = mongoose.model("Team", teamSchema);
module.exports = Team;