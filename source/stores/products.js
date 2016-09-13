"use strict";
import Reflux from 'reflux';
import Request from 'superagent';
import Actions from '../actions/products';

// use var at top level
// Default to using let
// Use const to say inmutability
const ProductStore = Reflux.createStore({
    init() {
        this.listenTo(Actions.FetchProducts, this.onFetchProducts);
    },

    onFetchProducts() {
        Request.
            get('/products.json').
            end((err, res) => {
                // in this context 'this' keyword references to ProductStore instance
                this.trigger(JSON.parse(res.text));
            });
    }
});

module.exports = ProductStore;
