import { recipes } from './recipes.mjs';

// Function to generate a random number
function random(num) {
    return Math.floor(Math.random() * num);
}

// Function to get a random recipe from the list
function getRandomListEntry(list) {
    return list[random(list.length)];
}

// Template function for the recipe
function recipeTemplate(recipe) {
    return `
        <figure class="recipe">
            <img src="${recipe.image}" alt="Image of ${recipe.name}" />
            <figcaption>
                <ul class="recipe__tags">
                    ${tagsTemplate(recipe.type)}
                </ul>
                <h2>${recipe.name}</h2>
                <p class="recipe__ratings">
                    ${ratingTemplate(recipe.rating)}
                </p>
                <p class="recipe__description">${recipe.description}</p>
            </figcaption>
        </figure>
    `;
}

// Template function for tags
function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

// Template function for ratings
function ratingTemplate(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '⭐' : '☆';
    }
    return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">${stars}</span>`;
}

// Function to render recipes
function renderRecipes(recipeList) {
    const outputElement = document.querySelector("#recipe-container"); // Ensure you have this ID in your HTML
    outputElement.innerHTML = recipeList.map(recipeTemplate).join('');
}

// Function to initialize the page and display a random recipe
function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

// Search functionality
function searchHandler(e) {
    e.preventDefault();
    const query = document.querySelector("#search-input").value.toLowerCase();
    const filtered = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query) ||
        recipe.type.toLowerCase().includes(query)
    );
    renderRecipes(filtered);
}

// Event listener for the search button
document.querySelector("#search-button").addEventListener("click", searchHandler);

// Initialize the page on load
init();
