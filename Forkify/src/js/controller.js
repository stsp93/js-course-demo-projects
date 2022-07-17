'use stict'

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';


import 'core-js/stable';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////




const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1. Loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);

  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    // 1. Get search Query
    const query = searchView.getQuery();
    if (!query) return;
    
    // 2. Loading Results
    await model.loadSearchResult(query);
    // 3. Render results
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();


const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
}
init();
