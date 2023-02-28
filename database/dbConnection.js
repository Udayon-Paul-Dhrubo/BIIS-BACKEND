// external imports
const mongoose = require("mongoose");

//* db connection function
async function dbConnection() {
    mongoose.set("strictQuery", false);

    mongoose
        .connect(
            process.env.MONGO_CONNECTION_URL,
            {
                //   these are options to ensure that the connection is done properly
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("Successfully connected to MongoDB Atlas!");
        })
        .catch((error) => {
            console.log("Unable to connect to MongoDB Atlas!");
            console.error(error);
        });
}

module.exports = dbConnection;