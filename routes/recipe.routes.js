const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const JWT = require("../token");
//create-recipe
router.post("/", async (req, res) => {
	try {
		const { title, ingredients, instructions, imageUrl } = req.body;
		const token = req.headers.authorization;

		const decodeToken = await JWT.decodeToken(token);
		// console.log(">>------>", req.body, token, decodeToken);

		// Create a new recipe
		await Recipe.create({
			title: title,
			ingredients: ingredients,
			instructions: instructions,
			imageUrl: imageUrl,
			createdBy: decodeToken.id,
		});

		res.status(200).json({ message: "Recipe added successfully..." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred..." + error });
	}
});

//get-all recipe
router.get("/getAll", async (req, res) => {
	try {
		const token = req.headers.authorization;
		if (token) {
			const decodeToken = await JWT.decodeToken(token);
			// console.log("-------->>>", decodeToken);

			const recipes = await Recipe.find({
				createdBy: decodeToken.id,
			});
			// console.log("-------->>", recipes);
			res.status(200).json({ recipes });
		} else {
			const recipes = await Recipe.find();
			res.status(200).json({ recipes });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred..." + error });
	}
});

//delete recipe
router.delete("/:id", async (req, res) => {
	try {
		const recipeId = req.params.id;
		console.log("-------", recipeId);

		// Delete the recipe by ID
		await Recipe.findByIdAndDelete(recipeId);

		res.status(200).json({ message: "Recipe deleted successfully..." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred..." + error });
	}
});

//update
router.put("/", async (req, res) => {
	try {
		const { title, ingredients, instructions, imageUrl } = req.body;
		const token = req.headers.authorization;

		const decodeToken = await JWT.decodeToken(token);

		const recipe = await Recipe.findOne({
			title: title,
			createdBy: decodeToken.id,
		});
		// console.log("------------->>", recipe);

		recipe
			? await Recipe.updateOne(
					{ title: recipe.title },
					{
						$set: {
							...req.body,
						},
					},
			  )
			: await Recipe.create({
					title: title,
					ingredients: ingredients,
					instructions: instructions,
					imageUrl: imageUrl,
					createdBy: decodeToken.id,
			  });
		res.status(200).json({ message: "Recipe updated successfully..." });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "An error occurred..." + error });
	}
});
//export
module.exports = router;
