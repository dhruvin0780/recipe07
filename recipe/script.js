const addRecipeForm = document.getElementById("add-recipe-form");
const recipeList = document.getElementById("recipe-list");

// addRecipeForm.addEventListener("submit", (event) => {
// 	event.preventDefault();

// 	const title = document.getElementById("recipe-title").value;
// 	const ingredients = document.getElementById("recipe-ingredients").value;
// 	const instructions = document.getElementById("recipe-instructions").value;
// 	const imageUrl = document.getElementById("imageUrl").value;

// 	// Send a POST request to the backend to add the recipe
// 	fetch("http://localhost:9000/recipes/create", {
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: localStorage.getItem("token"),
// 		},
// 		body: JSON.stringify({ title, ingredients, instructions, imageUrl }),
// 	})
// 		.then((response) => response.json())
// 		.then((data) => {
// 			// Clear the form
// 			addRecipeForm.reset();
// 			fetchRecipes();
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			alert("An error occurred....");
// 		});
// });

function createRECEPIE() {
	const title = document.getElementById("recipe-title").value;
	const ingredients = document.getElementById("recipe-ingredients").value;
	const instructions = document.getElementById("recipe-instructions").value;
	const imageUrl = document.getElementById("imageUrl").value;

	// Send a POST request to the backend to add the recipe
	fetch("http://localhost:9000/recipes/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
		},
		body: JSON.stringify({ title, ingredients, instructions, imageUrl }),
	})
		.then((response) => response.json())
		.then((data) => {
			// Clear the form
			addRecipeForm.reset();
			fetchRecipes();
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred....");
		});
}
//for update
// addRecipeForm.addEventListener("click", (event) => {
// 	event.preventDefault();

// 	const title = document.getElementById("recipe-title").value;
// 	const ingredients = document.getElementById("recipe-ingredients").value;
// 	const instructions = document.getElementById("recipe-instructions").value;
// 	const imageUrl = document.getElementById("imageUrl").value;
// 	// Create a new recipe object
// 	// const newRecipe = {
// 	// 	title,
// 	// 	ingredients,
// 	// 	instructions,
// 	// 	imageUrl,
// 	// };

// 	// Send a POST request to the backend to add the recipe
// 	fetch("http://localhost:9000/recipes/", {
// 		method: "PUT",
// 		headers: {
// 			"Content-Type": "application/json",
// 			Authorization: localStorage.getItem("token"),
// 		},
// 		// body: JSON.stringify(newRecipe),
// 		body: JSON.stringify({ title, ingredients, instructions, imageUrl }),
// 	})
// 		.then((response) => response.json())
// 		.then((data) => {
// 			addRecipeForm.reset();
// 			// Refresh the recipe list
// 			fetchRecipes();
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			alert("An error occurred....");
// 		});

// 	//
// });

//update
function updateRECEPIE() {
	const title = document.getElementById("recipe-title").value;
	const ingredients = document.getElementById("recipe-ingredients").value;
	const instructions = document.getElementById("recipe-instructions").value;
	const imageUrl = document.getElementById("imageUrl").value;

	// Send a POST request to the backend to add the recipe
	fetch("http://localhost:9000/recipes/", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
		},
		body: JSON.stringify({ title, ingredients, instructions, imageUrl }),
	})
		.then((response) => response.json())
		.then((data) => {
			addRecipeForm.reset();
			// Refresh the recipe list
			fetchRecipes();
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred....");
		});
}

function fetchRecipes() {
	// Send a GET request to the backend to fetch all recipes
	fetch("http://localhost:9000/recipes/getAll", {
		method: "GET",
		headers: {
			// "Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
		},
	})
		.then((response) => response.json())
		.then((data) => {
			// Clear the recipe list
			recipeList.innerHTML = "";

			// Iterate over each recipe and create a recipe card
			data.recipes.forEach((recipe) => {
				const recipeCard = createRecipeCard(recipe);
				recipeList.appendChild(recipeCard);
			});
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred");
		});
}

//create cards
function createRecipeCard(recipe) {
	const recipeCard = document.createElement("div");
	recipeCard.style.backgroundColor = "#EAE7DC";
	recipeCard.style.boxShadow = "0 4px 18px 0 rgba(0, 0, 0, 0.2)";
	recipeCard.style.width = "auto";

	// recipeCard.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
	recipeCard.style.boxSizing = "border-box";
	recipeCard.style.padding = "5px 5px 5px 5px";
	recipeCard.style.border = "10px #31C5D7";
	recipeCard.style.transition = "width 2s, background-color 1s, box-shadow 1s";
	recipeCard.style.borderRadius = "10px";
	recipeCard.style.color = "black";

	recipeCard.classList.add("recipe");

	const title = document.createElement("h2");
	title.textContent = recipe.title;
	recipeCard.appendChild(title);

	const ingredients = document.createElement("p");
	ingredients.textContent = "Ingredients: " + recipe.ingredients;
	recipeCard.appendChild(ingredients);

	const instructions = document.createElement("p");
	instructions.textContent = "Instructions: " + recipe.instructions;
	recipeCard.appendChild(instructions);

	const imageUrl = document.createElement("p");
	imageUrl.textContent = "imageUrl: " + recipe.imageUrl;
	recipeCard.appendChild(imageUrl);

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.style.backgroundColor = "#E7473C";
	deleteButton.style.marginLeft = "60em";
	deleteButton.addEventListener("click", () => {
		deleteRecipe(recipe._id);
	});
	recipeCard.appendChild(deleteButton);

	return recipeCard;
}

function deleteRecipe(recipeId) {
	// Send a DELETE request to the backend to delete the recipe
	fetch("http://localhost:9000/recipes/" + recipeId, {
		method: "DELETE",
	})
		.then((response) => response.json())
		.then((data) => {
			alert(data.message);
			// Refresh the recipe list
			fetchRecipes();
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred...");
		});
}

//logOut
document.getElementById("LOG-OUT-BTN").addEventListener("click", (event) => {
	event.preventDefault();

	// Send a POST request to the backend to login the user
	fetch("http://localhost:9000/auth/", {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: localStorage.getItem("token"),
		},
		body: JSON.stringify({}),
	})
		.then((response) => response.json())
		.then((data) => {
			alert(data.message);
			// localStorage.clear();
			//replace...
			data.statusCode === 1
				? (location.replace(
						"file:///D:/clgs/e-comerce%20web/mini-project/recipe-management/User/index.html",
				  ),
				  localStorage.clear())
				: alert(data.message);
		})
		.catch((error) => {
			console.error(error);
			alert("An error occurred...");
		});
});

fetchRecipes();
