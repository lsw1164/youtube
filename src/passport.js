import passport from "passport";
import User from "./models/User";
import GithubStrategy, { Strategy } from "passport-github";
import FacebookStrategy from "passport-facebook";
import {
  githubLoginCallback,
  facebookLoginCallback
} from "./controllers/userControllers";
import routes from "./routes";

passport.use(User.createStrategy());

const PORT = process.env.PORT || 4000;
const HOME_URL_PATH = process.env.PRODUCTION ? "https://gentle-forest-92388.herokuapp.com" : `http://localhost:${PORT}`;

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `${HOME_URL_PATH}${routes.githubCallback}`
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

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `${HOME_URL_PATH}${routes.facebookCallback}`,
      profileFields: ["id", "displayName", "photos", "email"],
      scope: ["public_profile", "email"]
    },
    facebookLoginCallback
  )
);

//If the Property "email" in user is null, I can't serializeUser it
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
