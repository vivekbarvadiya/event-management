const express = require("express");
const app = express();
require("dotenv").config();
const cookiParser = require("cookie-parser");

const PORT = process.env.PORT || 4000;

const userRoute = require("./routes/user.route.js");
const venderRoute = require("./routes/vender.route.js");
const serviceRoute = require("./routes/service.route.js");
const orderRoute = require("./routes/order.route.js");
const reviewRoute = require("./routes/review.route.js");
const { dbConnect } = require("./config/db.js");


// ----------------------------

const upload = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/'); // Destination folder for uploaded files
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname); // Rename file with timestamp
//     }
// });

// const upload = multer({ storage: storage });

// module.exports = upload;


// ------------------------------------

const fileUpload = require("express-fileupload");


app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

const error = require("./middlewares/error.js");
const { cloudinaryConnect } = require("./config/cloudinary.js");

cloudinaryConnect();



app.use(express.json());
app.use(cookiParser());

app.use(error);

dbConnect();

app.get("/", (req, res) => {
    res.send("ok");
})

app.use("/api/user", userRoute);
app.use('/api/vender', venderRoute);
app.use('/api/service', serviceRoute);
app.use('/api/order', orderRoute);
app.use('/api/review', reviewRoute);


app.listen(PORT, (req, res) => {
    console.log(`server running at ${`http://localhost:${PORT}`}`);
})