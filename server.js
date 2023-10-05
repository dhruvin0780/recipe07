const express = require("express");
const app = express();
const mongoose = require("mongoose");

//import routes
const authRoutes = require("./routes/auth.routes");
const recipeRoutes = require("./routes/recipe.routes");

const cors = require("cors");
const corsOptions = {
	origin: "*",
	credentials: true, //access-control-allow-credentials:true
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

//mongo connection...
mongoose.connect("mongodb://localhost:27017/myapp", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.json());

// Use the routes
app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);

app.listen(9000, () => {
	console.log("Server is running on port 9000");
});
