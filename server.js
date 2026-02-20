import express from "express";
import db from "./db.js";
import bodyParser from "body-parser"; // till express 4.16.0
import "dotenv/config";
import passport from "./auth.js";

const PORT = process.env.PORT || 3000;

const app = express();

//* middleware
// parse application/json
app.use(bodyParser.json()); //* req.body
app.use(passport.initialize()); // Initialize passport FIRST
const localAuthMiddleware = passport.authenticate("local", { session: false });

// *LogRequest Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`
  );
  next(); //move on to the next phase
};

// * logRequest generally applied on all routes
app.use(logRequest);

// * logRequest on specific route
// app.get("/", logRequest,(req, res) => {
//   res.send("Welcome to Our Hotel");
// });   //take this route once

//* import the router files
import personRoutes from "./routes/personRoute.js";
import menuRoutes from "./routes/menuRoute.js";
//* use the router
app.use("/persons", localAuthMiddleware, personRoutes);
app.use("/menuitems", menuRoutes);

// Add debug middleware (before your routes) to see all incoming requests
// app.use((req, res, next) => {
//   console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
//   next();
// });

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Our Hotel..welcome welcome!");
});
// app.get("/chicken", (req, res) => {
//   res.send("I would like to serve you chicken.");
// });

// app.get('/idli', (req, res) => {
//     var customized_idli = {
//         name: "Rava Idli",
//         size: "10 cm diamemeter",
//         isShambher: true,
//         isChutney:false,
//     }
//     res.send(customized_idli)
// })

//* This is the menu-card for our server(waiter) in the form of routes(paths)
//* No other route the server can display.It will take request according to this menu-card and sends response

//? POST route(endpoint) to save Person-data
// ? Using Call-Back Method - Deprecated   - DAY-
// app.post("/person", (req, res) => {
//   const data = req.body; //Assuming the request body contains the person-data

// create a new person-document using Mongoose Schema
//   const newPerson = new Person(data);

// * Don't write all these lines,instead write simply data inside parenthesis as Person's parameter
// newPerson.name = data.name;
// newPerson.age = data.age;
// newPerson.work = data.work;
// newPerson.email = data.email;
// newPerson.address = data.address;
// newPerson.salary = data.salary;

// * save the new Person to the database
//   newPerson.save((err, savedPerson) => {
//     if (err) {
//       console.log("Error saving Person-data:", err);
//       res.status(500).json({ err: "InternalServer Error" });
//     } else {
//       console.log("Data saved successfully");
//       res.status(200).json(savedPerson);
//     }
//   });
// });

// Add this to catch all undefined routes
// 404 CATCH-ALL ROUTE - MUST BE LAST!
app.use((req, res) => {
  res.status(404).send("Route not found yet");
});

app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
