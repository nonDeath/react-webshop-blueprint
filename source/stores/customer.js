"use strict";
import Reflux from "reflux";
import CustomerActions from "../actions/customer";

let _customer = {customer: [], validAddress: false};

const CustomerStore = Reflux.createStore({
    // subscribe the store methods to the actions
    init() {
        this.listenTo(CustomerActions.SaveAddress, this.onSaveAddress);
    },

    onSaveAddress(address) {
        _customer = address;
        this.emit();
    },

    emit() {
        this.trigger(_customer);
    }
});

// let visibility to the main component
module.exports = CustomerStore;
