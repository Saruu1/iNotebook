const mongoose = require ('mongoose');
const mongoURI = "mongodb+srv://sarvarhussain949:BABY!thisisn't1+1=2@cluster0.yopu3xs.mongodb.net/inotebook?retryWrites=true&w=majority";
const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
module.exports = connectToMongo;
