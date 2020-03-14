import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userControllers";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

/*
passport.serializeUser((user, done) => {
  console.log("user : " + user);
  console.log("done : " + done);
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("user : " + user);
  console.log("done : " + done);
  return done(null, user);
});
*/

//If the Property "email" in user is null, I can't serializeUser it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
