// VIEWS
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';

// MODELS
import Search from './models/Search';
import Recipe from './models/Recipe';

/** Global state of the app
* - Search object
* - Current recipe
* - Shopping list object
* - Liked recipes 
**/
const state = {};


/*
Search Controller;
*/
const controlSearch = async () => {
    // 1 Get query from view
    const query = searchView.getInput(); //TODO

    if(query) {
            // 2 new Search object and add to state
            state.search = new Search(query);

            // 3 Prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchRes);
        try {
            // 4 Search for recipes
            await state.search.getRecipes();

            // 5 Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } 
        catch(err) { 
            alert('there was some error\n'+err)
            clearLoader();
        }
    }
};
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result,goToPage)
    }

})



/*
Recipe Controller
*/
const controlRecipe = async () => {
    // Get the ID from the url
    const id = window.location.hash.replace('#','');

    if(id) {
        // prepare UI changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get the recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calc servings and time
            state.recipe.calcTime()
            state.recipe.calcServings()

            // Render recipe
            console.log(state.recipe);
        } catch(error) {
            alert('error Proccecing recipe! \n'+error)
        }
    }

}

// window.addEventListener('hashchange', controlRecipe)
['hashchange','load'].forEach(e => window.addEventListener(e, controlRecipe))


