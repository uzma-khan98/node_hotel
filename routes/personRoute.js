import express, { response } from "express";
import Person from "../models/Person.js";
import passport from "../auth.js";
const router = express.Router();
import jwtAuthMiddleware, { generateToken } from '../jwtFile.js' 

// * save the new Person to the database
// ? With Async-Await - try-catch block
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person-data

    //* create a new person-document using Mongoose Schema
    const newPerson = new Person(data);

    // * save the new Person to the database
    const savedPerson = await newPerson.save();
    console.log("Data saved:", savedPerson);

    const payload = {
      id: savedPerson.id,
      username: savedPerson.username
    }
    console.log(JSON.stringify(payload));

    //* get the token alongwith savedPerson
    const token = generateToken(payload);
   
    console.log("Token:", token);
  
    res.status(200).json({ savedPerson:savedPerson,token:token });
  } catch (err) {
    console.error("DETAILED ERROR:", err);
    console.log(err);
    res.status(500).json({
      error: "Internal server error",
      message: err.message // This tells you exactly why it failed
    });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;
    // Find the user by username
    const user = await Person.findOne({ username });
    // If user does not exist or password does not match, return error
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        error: 'Invalid username or password' });
     }
        const payload = { id: user.id, email: user.email }
      // Generate JWT token
      const token = generateToken(payload);
      // Send token in response
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// * GET method to get all persons
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const persons = await Person.find();
    console.log("Data fetched:", persons);
    res.status(200).json(persons);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// * profile route
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("user data :", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error!" })
  }
});

//* GET route to fetch a specific person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: "Person not found" });
    }
    res.status(200).json(person);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// * Using query parameters for nested paths in URL
//* GET route to fetch a specific person by work type
// ? make the work type route more specific:
router.get("/work/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; //Extract the work-type url parameter
    //apply validation
    if (
      workType == "chef" ||
      workType == "kitchen-helper" ||
      workType == "waiter" ||
      workType == "manager"
    ) {
      const response = await Person.find({ work: workType });
      console.log("Response Fetched:", response);
      res.status(200).json(response);
    } else {
      res.json({ err: "work type not defined" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// ? UPDATE data
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from URL parameter
    const updatedPersonData = req.body; //updated data for the person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, //return the updated document
        runValidators: true, //run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ? DELETE Data
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from URL parameter
    // * assuming you have a person model
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data deleted!");
    res.status(200).json({ Message: "Data deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
