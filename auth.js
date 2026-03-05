import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import Person from "./models/Person.js";

// * local-strategy for Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    // authentication logic here
    try {
      // console.log("Received Credentials: ", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) {
        return done(null, false, {
          message: "User not found/Incorrect username",
        });
      }

      // const isPasswordMatch = user.password === password ? true : false;
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
