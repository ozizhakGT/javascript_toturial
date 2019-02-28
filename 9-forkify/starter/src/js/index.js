// VIEWS
import {elements} from './views/base';
import * as searchView from './views/searchView';

// MODELS
import Search from './models/Search';

/** Global state of the app
* - Search object
* - Current recipe
* - Shopping list object
* - Liked recipes 
**/
const state = {};

const controlSearch = async () => {
    // 1 Get query from view
    const query = searchView.getInput(); //TODO

    if(query) {
        console.log(query)
        // 2 new Search object and add to state
        state.search = new Search(query);

        // 3 Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        // 4 Search for recipes
        await state.search.getRecipes();

        // 5 Render results on UI
        searchView.renderResults(state.search.result)
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch()
});