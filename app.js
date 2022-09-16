//Using native mongodb nodejs driver
/*const { MongoClient } = require("mongodb")

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017"

const client = new MongoClient(uri, { useUnifiedTopology: true })

async function run() {
  try {
    await client.connect()
    console.log("Connected Successfully to server")

    const database = client.db("fruitsDB")
    const fruitsCollection = database.collection("fruits")

    const cursor = fruitsCollection.find({})

    const docs = [
      {
        name: "Apple",
        score: 8,
        review: "Great Fruit",
      },
      {
        name: "Orange",
        score: 6,
        review: "Kind Sour",
      },
      {
        name: "Banana",
        score: 9,
        review: "Great Stuff!",
      },
    ]
    const option={ordered: true};

    const result=await fruitsCollection.insertMany(docs,option)

    console.log(`${result.insertedCount} documents were inserted`);
    //finding that element which have score greater than 5
    const query = { score: {$gt:5} }

    const product = await fruitsCollection.findOne(query)
    console.log("Found the document");
    console.log(product)
    //     if ((await cursor.count()) === 0) {
    //       console.log("No documents found!")
    //     }

    await cursor.forEach((fruit) => {
      //To print the inserted data
      // console.log(fruit)
    })
    database.collection("posts").countDocuments(
      {}, // filters
      {}, // options
      function (error, result) {
        //   console.log(result)
      }
     )
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

run().catch(console.dir)*/
//Using Mongoose
// getting-started.js
/*//Code for fruit database
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
const fruitSchema = new mongoose.Schema({
  name:{
  type:String,
  required:[true,"Please check your data entry, no name specified!"]
  },
  rating:{
    type:Number,
    min:1,
    max:10
  },
  review:String
});
const Fruit = mongoose.model('Fruit', fruitSchema);
/*const fruit=new Fruit(
{ name:'Apple',
  rating:7,
  review:'Pretty solid as a fruit'}
)*/
/*const kiwi=new Fruit(
{ name:'Kiwi',
  rating:10,
  review:'The Best Fruit!'}
)
const orange=new Fruit(
{ name:'Orange',
  rating:4,
  review:'Too sour for me'}
)
const banana=new Fruit(
{ name:'Banana',
  rating:3,
  review:'Very weird structure'}
)*/
/*Fruit.insertMany([kiwi,orange,banana],function(err){
  if(err) console.log(err);
  else console.log("Successfully saved all the fruits to fruitsDB");
})*/
/*const Peaches=new Fruit(
  {
    rating:10,
    review:"Peaches are awesome!"
  }
)*/
//Peaches.save();
//fruit.save();

/*Fruit.find(function(err,fruits){ //Instead of fruits we can give any name
  if(err) console.log(err);
  //else console.log(fruits);  //Printing all the fruits in fruit database
  else{
    fruits.forEach(element => console.log(element.name));
  }*/
  //mongoose.connection.close();  //To close the connection after the desired result
//})
//Update and  Delete should be below find
/*Fruit.updateOne({_id:"63197d3a8b275b632bc7f538"}, {name:"Peach"}, function(err){
  if(err) console.log(err);
  else console.log("Successfully Updated One Document.");
});*/
/*Fruit.deleteOne({_id:"63197d3a8b275b632bc7f538"}, function(err){
  if(err) console.log(err);
  else console.log("Successfully Deleted One Document.");
});*/
//Code for people database

  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled

/*const personSchema = new mongoose.Schema({
  name: String,
  age:Number,
  fovouriteFruit:fruitSchema
});
const pineapple=new Fruit(
  {name:"Pineapple",
  rating:9,
  review:"Great Fruit!"
})
//pineapple.save();
const Person = mongoose.model('Person', personSchema);
const person=new Person({
 name:'Amy',
  age:12,
  favouriteFruit:{name:"Pineapple",
  rating:9,
  review:"Great Fruit!"
}
})
person.save();*/
/*const person=new Person({
 name:'John',
  age:37
})*/
//person.save();
/*Person.deleteMany({name:"John"}, function(err){
  if(err) console.log(err);
  else {
    console.log("Successfully Deleted All Document.");
    mongoose.connection.close();}
});*/
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useUnifiedTopology: true, useNewUrlParser: true});



const fruitSchema = Schema({

  name: String,

  rating: Number,

  review: String

});



const personSchema = Schema({

    name: String,

    age: Number,

    favoriteFruit: { type: Schema.Types.ObjectId, ref: 'Fruit' }

});



const Fruit = mongoose.model('Fruit', fruitSchema);

const Person = mongoose.model('Person', personSchema);



const fruit = new Fruit({

  name: 'grapefruit',

  rating: 6,

  review: 'too sour!'

});

//To Create a new person and initialize its favourite fruit

fruit.save(function (err) {

  if (err) return handleError(err);



  const person1 = new Person({

    name: 'Ed',

    age: 16,

    favoriteFruit: fruit._id

  });



  person1.save(function (err) {

    if (err) return handleError(err);

    mongoose.connection.close();

  });

});
//To know which fruit the person likes
/*Person.findOne({ name: 'Amy' })

   .populate('favoriteFruit')

   .exec (function(err, person) {

   if (err) return console.log(err);

   console.log('favorite fruit is ', person.favoriteFruit.name);

   mongoose.connection.close();

});
//To Update the favourite fruit of a person
/*Fruit.findOne({name:"Apple"}).

    exec(function(err,fruit){

    if(err) return console.log(err);

    Person.updateOne({name:"Amy"}, {favoriteFruit:fruit._id}, function(err,people){

        if(err) return console.log(err);

    });

});*/
