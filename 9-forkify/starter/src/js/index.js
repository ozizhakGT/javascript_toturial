import axios from 'axios';
// https://www.food2fork.com/api/search
// API KEY c2c3c64c17cf9b72fd26601d88661d67

async function getRecipe(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = 'aaac2c3c64c17cf9b72fd26601d88661d67';
    try {
        const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
        console.log(recipes)
    }
    catch(err) {
        alert(err)
    }
}
getRecipe('pizza');