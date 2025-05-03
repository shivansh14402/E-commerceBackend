const mongoose = require('mongoose');

const db = mongoose.connect("mongodb+srv://shivansh14402:I1C15AzMa68wPyCv@cluster0.fmpmjiy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connected to MongoDB successfully");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
});

exports.db = db;