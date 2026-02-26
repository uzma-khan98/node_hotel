import mongoose from "mongoose";
import bcrypt from "bcrypt";

//* Define the Person-Schema,
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "waiter", "kitchen-helper", "manager"],
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  // Hash the password only if it has been modified or is new
  if (!person.isModified("password")) return next();
  try {
    // hashed password generation
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // override the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
// * How compare function works:
// prince ----> hgdksjshasjjasdhsdufh(stored in DB)
// when login again----> wrong password---> agarwal,   we think that compare function converts the first random password to plain text password and then matches both. This is actually not the case
// It actuially extracts salt from the first random password(FRP)
// salt +agerwal -----> hash---->lkdjjshuhsieioihasdbsdf(sth different)

// * create Person model
const Person = mongoose.model("Person", personSchema);
export default Person;
