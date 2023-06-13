// Recipe data structure
let recipes = [];

// Function to add a new recipe
function addRecipe(title, ingredients, instructions, image) {
  const recipe = {
    id: Date.now(),
    title,
    ingredients,
    instructions,
    image
  };
  recipes.push(recipe);
  saveRecipes();
  displayRecipes();
}

// Function to delete a recipe
function deleteRecipe(id) {
  recipes = recipes.filter(recipe => recipe.id !== id);
  saveRecipes();
  displayRecipes();
}

// Function to save recipes to local storage
function saveRecipes() {
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to load recipes from local storage
function loadRecipes() {
  const storedRecipes = localStorage.getItem('recipes');
  if (storedRecipes) {
    recipes = JSON.parse(storedRecipes);
    displayRecipes();
  }
}


// Function to display recipes on the page
function displayRecipes() {
  const recipesList = document.getElementById('recipes');
  recipesList.innerHTML = '';

  recipes.forEach(recipe => {
    const item = document.createElement('li');
    item.innerHTML = `
      <h3>${recipe.title}</h3>
      <div>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>${recipe.ingredients}</p>
        <p>${recipe.instructions}</p>
      </div>
      <div class="recipe-actions">
        <button onclick="viewRecipe(${recipe.id})">View</button>
        <button onclick="editRecipe(${recipe.id})">Edit</button>
        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
      </div>
    `;
    recipesList.appendChild(item);
  });
}


// Function to handle the image preview
function handleImagePreview(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const imagePreview = document.getElementById('image-preview');
      imagePreview.innerHTML = `
      <img src="${e.target.result}" alt="Image Preview"></img>`;
    };
    reader.readAsDataURL(file);
  }
  

// Attach the event listener to the image input field
document.getElementById('image').addEventListener('change', handleImagePreview);

// Function to view a recipe
function viewRecipe(id) {
    const recipe = recipes.find(recipe => recipe.id === id);
    if (recipe) {
      alert(`Viewing Recipe:\nTitle: ${recipe.title}\nIngredients: ${recipe.ingredients}\nInstructions: ${recipe.instructions}`);
    }
  }
  
// Function to edit a recipe
function editRecipe(id) {
  const recipe = recipes.find(recipe => recipe.id === id);
  if (recipe) {
    // Replace the recipe details with an editable form
    const recipeElement = document.getElementById('recipe-' + id);
    recipeElement.innerHTML = `
      <h3>Edit Recipe</h3>
      <form id="edit-form-${id}">
        <label for="edit-title-${id}">Title:</label>
        <input type="text" id="edit-title-${id}" value="${recipe.title}" required>
        
        <label for="edit-ingredients-${id}">Ingredients:</label>
        <textarea id="edit-ingredients-${id}" required>${recipe.ingredients}</textarea>
        
        <label for="edit-instructions-${id}">Instructions:</label>
        <textarea id="edit-instructions-${id}" required>${recipe.instructions}</textarea>
        
        <input type="submit" value="Save Changes">
      </form>
    `;

    // Attach an event listener to the edit form
    const editForm = document.getElementById(`edit-form-${id}`);
    editForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Retrieve the updated values from the form
      const newTitle = document.getElementById(`edit-title-${id}`).value;
      const newIngredients = document.getElementById(`edit-ingredients-${id}`).value;
      const newInstructions = document.getElementById(`edit-instructions-${id}`).value;

      // Update the recipe object
      recipe.title = newTitle;
      recipe.ingredients = newIngredients;
      recipe.instructions = newInstructions;

      saveRecipes();
      displayRecipes();
    });
  }
}



// Function to display recipes on the page
function displayRecipes() {
  const recipesList = document.getElementById('recipes');
  recipesList.innerHTML = '';

  recipes.forEach(recipe => {
    const item = document.createElement('li');
    item.innerHTML = `
      <h3>${recipe.title}</h3>
      <div>
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-list-image">
        <p>${recipe.ingredients}</p>
        <p>${recipe.instructions}</p>
      </div>
      <div class="recipe-actions">
        <button onclick="viewRecipe(${recipe.id})">View</button>
        <button onclick="editRecipe(${recipe.id})">Edit</button>
        <button onclick="deleteRecipe(${recipe.id})">Delete</button>
      </div>
    `;
    recipesList.appendChild(item);
  });
}

  
// Function to handle the form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  const title = document.getElementById('title').value;
  const ingredients = document.getElementById('ingredients').value;
  const instructions = document.getElementById('instructions').value;
  const image = document.getElementById('image').value; // Replace with actual file handling code

  addRecipe(title, ingredients, instructions, image);

  // Reset the form
  document.getElementById('recipe-form').reset();
}

// Function to initialize the application
function init() {
  loadRecipes();
  document.getElementById('recipe-form').addEventListener('submit', handleFormSubmit);
}

// Call the init function when the page has finished loading
document.addEventListener('DOMContentLoaded', init);