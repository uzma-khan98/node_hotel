import mongoose from 'mongoose';

//* Define the Person-Schema,
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    
  },
  work: {
    type: String,
    required: true,
    enum: ["chef", "waiter", "kitchen-helper", "manager"]
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  }
 
});

// * create Person model
const Person = mongoose.model("Person", PersonSchema);
export default Person;