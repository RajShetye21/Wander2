const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));


// Databse connectivity 
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wander2');
}

// Sample testing 
// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "Taj Hotel",
//         description: "Will give you luxuries life",
//         image: "https://landlopers.com/wp-content/uploads/2018/04/Mumbai-India-Taj-Mahal-Palace.jpg",
//         price: "15000",
//         location: "Mumbai",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("Successfulll");
// });

// index Route 
app.get("/listings", async (req, res) => {
    const AllListing = await Listing.find({});
    res.render("listings/index.ejs", { AllListing });
});

// New Route 
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


// Show Route 
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create Route 
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    let Data = await newListing.save();
    res.redirect("/listings");
});





app.listen(3000, (req, res) => {
    console.log("Server is working....");
});