const mongoose = require('mongoose');

const connectToDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log("database is now connected");
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectToDB