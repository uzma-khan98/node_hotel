import express from "express";
import MenuItems from "../models/Menu.js";
const router = express.Router();

//? Menu Items
// * POST method to add a menu item in DataBase
router.post("/", async (req, res) => {
  try {
    const data = req.body; //Assuming the request body contains the person-data

    //* create a new person-document using Mongoose Schema
    const MenuItems = new MenuItems(data);

    // * save the new Person to the database
    const savedMenuItem = await MenuItems.save();
    console.log("Data saved:", savedMenuItem);
    res.status(200).json(savedMenuItem) ;
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" })
  }
});


// * GET method to get all menuItems
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItems.find();
    console.log("Data fetched:", menuItems);
    res.status(200).json(menuItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" })
  }
});

//* GET route to fetch a specific menu item by taste
router.get("/taste/:tasteType", async (req, res) => {
  try {
    const tasteType = req.params.tasteType;
    if (tasteType == 'sweet' || tasteType == 'salty' || tasteType == 'sour' || tasteType == 'chilli') {
      const response = await MenuItems.find({ taste: tasteType });
      console.log("Response Fetched:", response);
      res.status(200).json(response);
    } else {
      res.json({ err: "taste type not defined" })
    }
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server error" })
  }
})
//* GET route to fetch a specific menu item by ID
router.get("/:id", async (req, res) => {
  try {
    const menuItem = await MenuItems.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: "MenuItem not found" });
    }
    res.status(200).json(menuItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
// changes to test
export default router;