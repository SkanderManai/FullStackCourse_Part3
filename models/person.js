const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log("error connecting to database: ", error.message);
  });

const numberValidator = (number) => {
  let regex1 = /\d\d-[0-9]+/i;
  let regex2 = /\d\d\d-[0-9]+/i;
  return regex1.test(number) || regex2.test(number);
};

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: [numberValidator, "This number is not of the correct format"],
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
