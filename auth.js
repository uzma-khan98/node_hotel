import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Persons from "./models/Person.js";

// * local-strategy for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // authentication logic here
    try {
      // console.log("Received Credentials: ", username, password);
      const user = await Persons.findOne({ username: username });
      if (!user) {
        return done(null, false, {
          message: "User not found/Incorrect username",
        });
      }

      const isPasswordMatch = await user.comparePassword(password);
      // * password match and user authenticates
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
