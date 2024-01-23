import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import mongoose from "mongoose";

// Połączenie z bazą danych MongoDB
mongoose.connect("mongodb://localhost/passport-local-example", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definicja modelu użytkownika
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
	role: String
  })
);

// Konfiguracja Passport
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username }).exec();
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Ustawienia aplikacji Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "secret-key", resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());

// Middleware sprawdzający, czy użytkownik jest zalogowany
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.get("/login", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Logowanie</title>
</head>
<body>
  <h1>Logowanie</h1>
  <form action="/login" method="post">
    <label for="username">Nazwa uzytkownika:</label>
    <input type="text" id="username" name="username" required>
    <br>
    <label for="password">Hasło:</label>
    <input type="password" id="password" name="password" required>
    <br>
    <button type="submit">Zaloguj</button>
	<button type="submit">Wyczyść</button>
  </form>
</body>
</html>

`);
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.send("Błąd podczas wylogowywania");
    }
    res.redirect("/");
  });
});

export default app;
