const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const College = require('./models/College');
const Student = require('./models/Student');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ChaitanyaPandit1998:ChaitanyaPandit1998@cluster0.gjns2.mongodb.net/collegeBuddy?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => { 
    console.log("Database Connected!");
});

app.get("/", async (req, res) => {
    
    try{
        const stateCourse = await College.find({}).select('state courses yearFounded');
        const data = {};
        data['courses'] = groupBy(stateCourse, 'courses');
        data['state'] = groupBy(stateCourse, 'state');
        data['yearFounded'] = groupBy(stateCourse, 'yearFounded');
        return res
            .json({
                data
            });
    }
    catch (error) {
        return res.json({ MSG : "Something Went Wrong !" });
    }

});


const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server Running On Port ${PORT}`)
);


const groupBy = (data, search) => {
    const count = {};
    for (let x of data) {
        const val = x[search];
        if (typeof (val) === "object") {
            for (let y of val) {
                count[y] ? count[y]++ : count[y] = 1;
            }
        } else {
            count[val] ? count[val]++ : count[val] = 1;
        }
    }
    return count;
}