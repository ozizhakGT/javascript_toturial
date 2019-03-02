import {key, proxy} from '../config'
import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getRecipes() {
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        }
        catch(err) {
            alert(err)
        }
    }
}