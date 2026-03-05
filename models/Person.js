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

//* We do password modification, just before saving it to DB-means do hashing with bcrypt
personSchema.pre("save", async function (next) {
  const person = this;  //this represents here,the person's record

  // Hash the password only if it has not been modified (means new record) OR the old one that is already hashed(modified)
  if (!person.isModified("password")) return next(); //then no need of hashing so move on to next
  try {
    // hashed password generation
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

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
// actual password hashed === wrong password-hashed (it checks)
// hgdksjshasjjasdhsdufh === lkdjjshuhsieioihasdbsdf(not the same) so not allowed to login

// The compare function extracts the salt from storedHashedPassword and uses it to hash the entered password.It then compares the resulted hash with the stored one; if they match, it indicates that the entered password is correct.

// * create Person model
const Person = mongoose.model("Person", personSchema);
export default Person;
