const express = require("express");
const cors = require("cors");
const morgan = require("morgan")

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

const userRouter = require("./routes/user");
app.use(userRouter);

app.get("/", (req, res) => {
    res.send("Express API Index");
});

app.listen(8000, () => {
    console.log("API server running at port 8000");
});