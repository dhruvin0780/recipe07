document.addEventListener("DOMContentLoaded", function () {
	// Get recipe list container
	var recipeListContainer = document.getElementById("recipe-list-container");

	function fetchRecipes() {
		// Send a GET request to the backend to fetch all recipes
		fetch("http://localhost:9000/recipes/getAll")
			.then((response) => response.json())
			.then((data) => {
				// Iterate over each recipe and create a recipe card
				data.recipes.forEach((recipe) => {
					var li = document.createElement("li");
					li.innerHTML = `	
								<div class="center">
								<div class="property-card">
									<div class="property-image">
										<img src='${recipe.imageUrl}' class="property-image">
									</div>
								<div class="property-description">
									<h1>${recipe.title}</h1>
									<div>
										<h3>Ingredients:</h3>
										<p>${recipe.ingredients}</p>
									</div>
									<div>
										<h3>Instructions:</h3>
										<p>${recipe.instructions}</p>
									</div>
									</div>
								</div>
							</div>
					`;
					recipeListContainer.appendChild(li);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}
	fetchRecipes();
});

//
//
//

// function fetchRecipes() {
// 	// 	// Send a GET request to the backend to fetch all recipes
// 	fetch("http://localhost:9000/recipes/get-all")
// 		.then((response) => response.json())
// 		.then((data) => {
// 			// Iterate over each recipe and create a recipe card
// 			data.recipes.forEach((recipe) => {
// 				var li = document.createElement("li");
// 				li.innerHTML = `
// 								<table>
// 									<tr>
// 										<td style="width: 100px; color:white">${recipe.title}</td>
// 										<td><img src='${recipe.image}' alt="apple" width="400"></td>
// 										<td style="">Ingredients: ${recipe.ingredients}</td>
// 										<td>Instructions: ${recipe.instructions}</td>
// 									</tr>
// 								</table>
// 					`;
// 				recipeListContainer.appendChild(li);
// 			});
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 			alert("An error occurred");
// 		});
// }
// fetchRecipes();
{
	/* <table>
									<tr>
										<td style="width: 100px;">${recipe.title}</td>
										<td><img src='${recipe.imageUrl}' alt="apple" width="400"></td>
										<td>Ingredients: ${recipe.ingredients}</td>
										<td>Instructions: ${recipe.instructions}</td>
									</tr>
									<br>
									<br>
								</table> */
}
