import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const key = 'c2c3c64c17cf9b72fd26601d88661d67';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch(err) {
            alert(err)
        }
    }
}