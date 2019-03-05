// VIEWS
import {elements, renderLoader, clearLoader} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

// MODELS
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import Likes from './models/Like';

/** Global state of the app
* - Search object
* - Current recipe
* - Shopping list object
* - Liked recipes 
**/
const state = {};


// Restore Likes recipe when page load
window.addEventListener('load', () => {
    state.likes = new Like();
    state.likes.readStorage();
    likesView.toggleLikesMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => {
        likesView.renderLike(like)
    });
});

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
        recipeView.clearRcipe();
        renderLoader(elements.recipe);

        // Highlight active recipe in searchView
        if (state.search) {
            searchView.highlightSelected(id);   
        }
        
        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get the recipe data
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calc servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch(error) {
            clearLoader();
            console.error(error)
            alert('error Proccecing recipe! \n'+error);
        }
    }

}

// window.addEventListener('hashchange', controlRecipe)
['hashchange','load'].forEach(e => window.addEventListener(e, controlRecipe));


// SHOPPING LIST CONTROLLER
const controlList = () => {
    // Clear list 
    listView.clearList();

    // Create new list if there in none yet
    if (!state.list) {
        state.list = new List();
    }

    // Add each ingredientsto the list
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient)
        listView.renderItem(item);
    })
};
// LIKES CONTROLLER
const controlLike = () => {
    if (!state.likes) {
        state.likes = new Like();
    }
    const currentID = state.recipe.id;

    // user has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to this state
        const newLike = state.likes.addLike(currentID, state.recipe.title, state.recipe.author, state.recipe.img)

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        // console.log(state.likes);
        likesView.renderLike(newLike);

    // user has liked current recipe
    } 
    else {
        // Remove like to this state
        state.likes.deleteLike(currentID);
        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID)
        // console.log(state.likes);
    }

    likesView.toggleLikesMenu(state.likes.getNumLikes());
}

// Handle delete and shopping List
elements.shoppingList.addEventListener('click' ,e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delte from the state
        state.list.deleteItem(id);

        // Delete from the UI
        listView.deleteItem(id);

    }
})


// Handling recipe buttons clicks
elements.recipe.addEventListener('click', e => {
        if (e.target.matches('.btn-decrease, .btn-decrease *')) {
            if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
            //  Decrease buttonis clicked
            }
        }
        else if (e.target.matches('.btn-increase, .btn-increase *')) {
            //  Increase buttonis clicked
            state.recipe.updateServings('inc');
            recipeView.updateServingsIngredients(state.recipe);
        }
        else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
            // Add ingredients to shpping list
            controlList();
        }
        else if(e.target.matches('.recipe__love, .recipe__love *')) {
            // Like controller
            controlLike();
        }
});