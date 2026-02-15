// this is a seeder file to add all esixted products or userAccounts in DB at once
// importing mongoose
const mongoose = require('mongoose');
// importing Product and User models
const Product = require('./models/Product');
const User = require('./models/UserScheama');
// now importing products file 
const defProducts = require('./data/products');
// config
const config = require('config');


// connect to mongoDB
mongoose.connect(config.get("server.database"));

// function to seed data
const seedData = async()=>{
    try {
        // clear existing data
        await Product.deleteMany();
        await User.deleteMany();

        // create a default admin user
        const createdAdmin = User.create({
            name:'adminUser',
            email:'adminUser@gmail.com',
            password:'11228',
            role:'admin'
        });
        // assign the default userID to each product
        const userID = (await createdAdmin)._id
        const sampleProduct = defProducts.map((product)=>{
            return {...product,user:userID}
        });
        // insert in DB
        await Product.insertMany(sampleProduct);
        console.log('all products seeded');
    } catch (error) {
        console.log(error);
    }
};
// calling seed function
seedData();