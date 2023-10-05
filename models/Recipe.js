const mongoose = require("mongoose");
const schema = mongoose.Schema;

// require("mongoose-type-url");

const recipeSchema = new mongoose.Schema({
	title: { type: String, maxlength: 20 },
	ingredients: { type: String, maxlength: 10000 },
	instructions: { type: String, maxlength: 10000 },
	imageUrl: {
		type: String,
	},
	createdBy: { type: schema.Types.ObjectId },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;

// if ({ Alive } === Required(true)) {
// 	do {
// 		Learn = Add.Skill();
// 		await Build_Logic();
// 		await Create_Strategy();
// 		await Implement_Code();
// 		await Practice();
// 		await Get_Absolute_Output();
// 		await Be_Happy();
// 		await Being_Sigma();
// 		await Add_New_Functionality();
// 	} while (!Success);
// }
