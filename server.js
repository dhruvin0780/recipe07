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

//mongo connection...hVnocblNCXUNjsiO///dhruvin07botify
// mongoose.connect("mongodb://localhost:27017/myapp", {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// });

mongoose
	.connect(
		"mongodb+srv://dhruvin07botify:hVnocblNCXUNjsiO@myapp.vywczer.mongodb.net/myapp?retryWrites=true&w=majority",
		// "mongodb+srv://dhruvin07botify:hVnocblNCXUNjsiO@myapp.vywczer.mongodb.net/",
	)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log(`Error connecting to MongoDB: ${err}`);
	});
app.use(express.json());

// Use the routes
app.use("/auth", authRoutes);
app.use("/recipes", recipeRoutes);

const port = `0.0.0.0`;

app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
