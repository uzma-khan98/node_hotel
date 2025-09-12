import express from "express";
import Persons from "../models/Person.js";
const router = express.Router();

// ? With Async-Await - try-catch block
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person-data

    //* create a new person-document using Mongoose Schema
    const newPerson = new Persons(data);

    // * save the new Person to the database
    const savedPerson = await newPerson.save();
    console.log("Data saved:", savedPerson);
    res.status(200).json(savedPerson);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" })
  }
});

// * GET method to get all persons
router.get("/", async (req, res) => {
  try {
    const persons = await Persons.find();
    console.log("Data fetched:", persons);
    res.status(200).json(persons);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" })
  }
})

//* GET route to fetch a specific person by ID
router.get("/:id", async (req, res) => {
  try {
    const person = await Persons.findById(req.params.id);
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
router.get('/work/:workType', async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == 'chef' || workType == 'kitchen-helper' || workType == 'waiter' || workType == 'manager') {
      const response = await Persons.find({ work: workType });
      console.log("Response Fetched:", response);
      res.status(200).json(response);
    } else {
      res.json({ err: "work type not defined" })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" });
  }
});

// ? UPDATE data
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from URL parameter
    const updatedPersonData = req.body;  //updated data for the person

    const response = await Persons.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,   //return the updated document
      runValidators: true,   //run mongoose validation
    });

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
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id; //extract the id from URL parameter
    // * assuming you have a person model
    const response = await Persons.findByIdAndDelete(personId);

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


