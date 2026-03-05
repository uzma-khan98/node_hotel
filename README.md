# Node Hotel Application
The Node Hotel application is a Node.js-based system developed using the Express.js framework, with MongoDB as the chosen database. This application manages information related to persons (staff) and menu items. It exposes specific endpoints to handle CRUD (Create, Read, Update, Delete) operations for both persons and menu items.
## APIs-Endpoints
### Persons
+ Add a Person:
    + Endpoint: POST /person
    + Description: Adds a person to the system with details such as name, role, etc.
+ Get All Persons:
   + Endpoint: GET /persons
   + Description: Retrieves a list of all persons in the system.
+ Get Persons by Work Type:
    + Endpoint: GET /person/:workType
    + Description: Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).
+ Update a Person:
    + Endpoint: PUT /person/:id
    + Description: Updates the details of a specific person identified by their ID.
 + Delete a Person:
     + Endpoint: DELETE /person/:id
     + Description: Deletes a person from the system based on their ID.

  ### Menu Items
 + Add a Menu Item:
     + Endpoint: POST /menu
     + Description: Adds a menu item to the system with details such as name, price, taste, etc.
 + Get All Menu Items:
     + Endpoint: GET /menu
     + Description: Retrieves a list of all menu items in the system.
 + Get Menu Items by Taste:
     + Endpoint: GET /menu/:taste
     + Description: Retrieves a list of menu items based on their taste (e.g., sweet, spicy, sour).
 + Update a Menu Item:
     + Endpoint: PUT /menu/:id
     + Description: Updates the details of a specific menu item identified by its ID.
 + Delete a Menu Item:
     + Endpoint: DELETE /menu/:id
     + Description: Deletes a menu item from the system based on its ID.

 ## Data Models
### Person
   + The **Person** data model represents information about staff members in the hotel.

+ Fields:

   + name: String (Person's name)
   + age: Number (Person's age)
   + work: Enum (Role in the hotel, such as chef, waiter, manager)
   + mobile: String (Person's mobile number)
   + email: String (Person's email address, unique)
   + address: String (Person's address)
   + salary: Number (Person's salary)
 
+ Example:
  ```
     {
       "name": "John Doe",
        "age": 30,
       "work": "waiter",
     "mobile": "123-456-7890",
      "email": "john@example.com",
    "address": "123 Main Street",
     "salary": 30000
     }
  ```

 ### Menu Item
  The MenuItem data model represents information about menu items available in the hotel.

+ Fields:

   + name: String (Item's name)
   + price: Number (Item's price)
   + taste: Enum (Item's taste, such as sweet, spicy, sour)
   + is_drink: Boolean (Indicates if the item is a drink, default is false)
   + ingredients: Array of Strings (List of ingredients, default is an empty array)
   + num_sales: Number (Number of sales for the item, default is 0)
 
+ Example:
   ```
  {
  "name": "Spicy Chicken Curry",
  "price": 12.99,
  "taste": "spicy",
  "is_drink": false,
  "ingredients": ["chicken", "spices", "vegetables"],
  "num_sales": 50
   }
     ```

  ## Usage
  
  1\. Install Dependencies:
     
  `npm install express dotenv mongoose`

  ### Important Updates:

    +  We used body-parser middleware in server.js, that is now deprecated after express v-4.16.0, so we use now:
  
  `app.use(express.json());`

    +  Instead of installing nodemon to restart the server, we can use in package.json

   `"dev": "node --watch server.js"`
  
    And the server can be restarted now by the command in terminal,
  
   `npm run dev`

    ### Authentication & Authorization (Using Passport.js)
  
  `npm install passport passport-local`

   ### Password Hashing using bcrypt

  `npm install bcrypt`

  Backend developer hashes the password before saving it in database. So we have to update person model **to store hashed-passwords in DB**; modify the registeration logic in schema.
  
In Person.js,

   ```
//* We do password modification,just before saving it to DB-means do hashing with bcrypt
  personSchema.pre("save", async function (next) {
  const person = this;  //data is stored in person-collection in DB (that is object here in JS)
  //as pre-save function runs for every update in data, (not only in case of hashing password), so we need to identify for the already-hashed password 
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
   })
```

In auth.js, we use compare() function as,

` const isPasswordMatch = await user.comparePassword(password); `

In Person.js

```
personSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    // use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;
  } catch (error) {
    throw error;
  }
};
```


The compare function extracts the salt from storedHashedPassword and uses it to hash the entered password. It then compares the resulted hash with the stored one; if they match, it indicates that the entered password is correct.




  

  

    
  
 






 




