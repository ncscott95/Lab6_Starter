// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

// Starts the program, all function calls trace back here
function init() {
	// Get the recipes from localStorage
	let recipes = getRecipesFromStorage();
	// Add each recipe to the <main> element
	addRecipesToDocument(recipes);
	// Add the event listeners to the form elements
	initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
	// A9. Complete the functionality as described in this function
	//     header. It is possible in only a single line, but should
	//     be no more than a few lines.
	return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. Get a reference to the <main> element
	let mainElement = document.querySelector('main');

	// A11. Loop through each of the recipes in the passed in array,
	//      create a <recipe-card> element for each one, and populate
	//      each <recipe-card> with that recipe data using element.data = ...
	//      Append each element to <main>
	for (const recipe of recipes) {
		let recipeElement = document.createElement('recipe-card');
		recipeElement.data = recipe;
		mainElement.append(recipeElement);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. Complete the functionality as described in this function
	//     header. It is possible in only a single line, but should
	//     be no more than a few lines.
	let jsonString = JSON.stringify(recipes);
	localStorage.setItem('recipes', jsonString);
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	let mainElement = document.querySelector('main');

	// B2. Get a reference to the <form> element
	let formElement = document.querySelector('form');

	// B3. Add an event listener for the 'submit' event, which fires when the
	//     submit button is clicked
	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		// Steps B4-B9 will occur inside the event listener from step B3
		// B4. Create a new FormData object from the <form> element reference above
		const formData = new FormData(formElement);

		// B5. Create an empty object (we'll refer to this object as recipeObject to
		//     make this easier to read), and then extract the keys and corresponding
		//     values from the FormData object and insert them into recipeObject
		let recipeObject = Object.fromEntries(formData.entries());

		// B6. Create a new <recipe-card> element
		let recipeCardElement = document.createElement('recipe-card');

		// B7. Add the recipeObject data to <recipe-card> using element.data
		recipeCardElement.data = recipeObject;

		// B8. Append this new <recipe-card> to <main>
		mainElement.append(recipeCardElement);

		// B9. Get the recipes array from localStorage, add this new recipe to it, and
		//            then save the recipes array back to localStorage
		let recipeArray = getRecipesFromStorage();
		recipeArray.push(recipeObject);
		saveRecipesToStorage(recipeArray);
	});

	// B10. Get a reference to the "Clear Local Storage" button
	let clearButtonElement = document.querySelector('form .danger');

	// B11. Add a click event listener to clear local storage button
	clearButtonElement.addEventListener('click', () => {
		// Steps B12 & B13 will occur inside the event listener from step B11
		// B12. Clear the local storage
		localStorage.clear();

		// B13. Delete the contents of <main>
		mainElement.replaceChildren();
	});
}
