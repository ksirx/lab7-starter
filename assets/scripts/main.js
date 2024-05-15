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
	// A9. TODO - Complete the functionality as described in this function
	//           header. It is possible in only a single line, but should
	//           be no more than a few lines.

	// gets from local storage
	let recipes = localStorage.getItem('recipes');
	// converts to an array
	const arr = JSON.parse(recipes);
	//returns array
	return arr;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
	// A10. TODO - Get a reference to the <main> element

	let mainref = document.querySelector('main');

	// A11. TODO - Loop through each of the recipes in the passed in array,
	//            create a <recipe-card> element for each one, and populate
	//            each <recipe-card> with that recipe data using element.data = ...  
	//            Append each element to <main>

	for (let i = 0; i < recipes.length; i++) {
		let card = document.createElement('recipe-card');
		card.data = recipes[i];
		mainref.appendChild(card);
	}
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
	// EXPLORE - START (All explore numbers start with B)
	// B1. TODO - Complete the functionality as described in this function
	//            header. It is possible in only a single line, but should
	//            be no more than a few lines.

	// turn the recipes into json format
	const str = JSON.stringify(recipes);
	// get access to the localStorage and set it to the  string format
	localStorage.setItem('recipes', str);
}

/**
 * Adds the necessary event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {
	// B2. TODO - Get a reference to the <form> element

	const ref = document.querySelector('form');
	
	// B3. TODO - Add an event listener for the 'submit' event, which fires when the
	//            submit button is clicked

	// gets the first button which is the submit button
	const sub = document.querySelector('button');
	// event listener for when this button is clicked
	sub.addEventListener('click', function() {
		// Steps B4-B9 will occur inside the event listener from step B3
		// B4. TODO - Create a new FormData object from the <form> element reference above

		const data = new FormData(ref);

		// B5. TODO - Create an empty object (we'll refer to this object as recipeObject to
		//            make this easier to read), and then extract the keys and corresponding
		//            values from the FormData object and insert them into recipeObject

		// empty object
		const recipeObject = {};
		// gets the keys and value form the data and inserts the mapping to empty object
		for (let [key, value] of data.entries()) {
			recipeObject[key] = value;
		}

		// B6. TODO - Create a new <recipe-card> element

		const newelem = document.createElement('recipe-card');

		// B7. TODO - Add the recipeObject data to <recipe-card> using element.data

		newelem.data = JSON.stringify(recipeObject);

		// B8. TODO - Append this new <recipe-card> to <main>

		const main = document.querySelector('main');
		main.appendChild(newelem);

		// B9. TODO - Get the recipes array from localStorage, add this new recipe to it, and
		//            then save the recipes array back to localStorage

		let arr = getRecipesFromStorage();
		arr.push(newelem);
		saveRecipesToStorage(arr);

		// B10. TODO - Get a reference to the "Clear Local Storage" button

		const cls = document.getElementsByClassName('danger');

		// B11. TODO - Add a click event listener to clear local storage button

		cls.addEventListener('click', function() {
			// Steps B12 & B13 will occur inside the event listener from step B11
			// B12. TODO - Clear the local storage

			localStorage.clear();

			// B13. TODO - Delete the contents of <main>
			while (main.childElementCount != 0) {
				main.removeChild(main.firstChild);
			}
		});
	});
}
