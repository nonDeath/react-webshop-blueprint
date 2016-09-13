"use strict";

import Reflux from "reflux";
import CartActions from "../actions/cart.js";
// define private cart store representation, it isn't visible to the rest of
// the app.
let _cart = {cart: []};

const CartStore = Reflux.createStore({
    // on init the CartStore connect with the actions will be executed
    init() {
        this.listenTo(CartActions.AddToCart, this.onAddToCart);
        this.listenTo(CartActions.RemoveFromCart, this.onRemoveFromCart);
        this.listenTo(CartActions.ClearCart, this.onClearCart);
    },

    onAddToCart(item) {
        _cart.cart.push(item);
        this.emit();
    },

    onRemoveFromCart(item) {
        _cart.cart = _cart.cart.filter((cartItem) => {
            return item !== cartItem;
        });
        this.emit();
    },

    onClearCart() {
        _cart.cart = [];
        this.emit();
    },
    // emit the cart, any component that listen to this store will receive the
    // object and render new data.
    emit() {
        this.trigger(_cart);
    }
});

module.exports = CartStore;