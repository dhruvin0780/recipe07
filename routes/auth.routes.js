const express = require("express");
const router = express.Router();
const User = require("../models/User");
const crypto = require("crypto");
const JWT = require("../token");
const jwt = require("jsonwebtoken");
const privateKey = "ddBHESANIYA@902?";

//create user (register)
router.post("/register", async (req, res) => {
	try {
		const { userEmail, password } = req.body;

		// Check if the username already exists
		const existingUser = await User.findOne({ email: userEmail });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "🤦‍♂️Username already exists!!!", statusCode: 0 });
		}

		//hash pass
		const hashPass = await crypto
			.createHash("sha256")
			.update(password.toString())
			.digest("hex");

		// Create a new user
		const newUser = new User({ email: userEmail, password: hashPass });
		await newUser.save();

		res
			.status(200)
			.json({ message: "User registered successfully...😃✔🎉", statusCode: 1 });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "🤦‍♀️An error occurred!!!  " + error, statusCode: -1 });
	}
});

//log-in user
router.post("/login", async (req, res) => {
	try {
		const { userEmail, password } = req.body;

		const user = await User.findOne({
			email: userEmail,
			// isLoggedIn: false,
		});

		// Check if the password matches
		if (user) {
			const decodedPass = await crypto
				.createHash("sha256")
				.update(password)
				.digest("hex");

			if (user.password !== decodedPass) {
				return res
					.status(400)
					.json({ message: "Invalid password!!!😢", statusCode: 0 });
			} else if (user.isLoggedIn === true) {
				return res
					.status(400)
					.json({ message: "👀You are already LoggedIn!!!", statusCode: -1 });
			}
			const userLogin = await User.updateOne(
				{
					email: user.email,
				},
				{ $set: { isLoggedIn: true } },
			);

			const TOKEN = jwt.sign(
				{
					id: user._id,
					email: user.email,
					// password: user.password,
				},
				privateKey,
				{ expiresIn: "1h" },
			);
			// console.log("=====>>", TOKEN);
			res.status(200).json({
				message: "User logged in successfully!!!✨✔",
				statusCode: 1,
				token: TOKEN,
			});
		} else {
			return res
				.status(400)
				.json({ message: "You need to 1st registration!!!😃", statusCode: 0 });
		}
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "An error occurred" + error, statusCode: -1 });
	}
});

//logOut
router.patch("/", async (req, res) => {
	try {
		const token = req.headers.authorization;
		// console.log("=================>>", token);

		if (token === "null") {
			res.status(401).json({ message: "Unthorised...", statusCode: -1 });
		}

		//decode the token
		const decodeToken = await JWT.decodeToken(token);

		//update the isLoggedIn=false
		await User.updateOne(
			{
				email: decodeToken.email,
			},
			{
				$set: { isLoggedIn: false },
			},
		);

		res
			.status(200)
			.json({ message: "User Log-Out successfully!!!✨✔", statusCode: 1 });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ message: "An error occurred" + error, statusCode: -1 });
	}
});

//get
router.get("/dhruvin", async (req, res) => {
	try {
		// const token = req.headers.authorization;
		// console.log("TOKEN------->>", token);

		// if (!token) {
		// 	return res.status(401).json({
		// 		error: true,
		// 		message: "Access-token is missing...!!!",
		// 	});
		// }
		// const decodeToken = await JWT.decodeToken(token);
		// console.log("-------->>>", decodeToken);

		// const user = await User.findOne({
		// 	email: decodeToken.email,
		// });
		// console.log("-------->>", user);
		const user = "dhruvin here!";
		res.status(200).json({ user });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred..." + error });
	}
});

module.exports = router;
