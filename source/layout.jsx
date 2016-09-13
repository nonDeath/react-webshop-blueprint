"use strict";

import React from "react";
import Reflux from 'reflux';
import Footer from "./components/footer.jsx";
import Menu from "./components/menu.jsx";
import Actions from "./actions/products";
import ProductStore from "./stores/products";
import CartStore from "./stores/cart";
import CustomerStore from "./stores/customer";

const Layout = React.createClass ({
    mixins: [
        Reflux.listenTo(ProductStore, 'onFetchProducts'),
        Reflux.listenTo(CartStore, 'onCartUpdated'),
        Reflux.listenTo(CustomerStore, 'onCustomerUpdated'),
    ],

    onCartUpdated(data) {
        this.setState({cart: data.cart});
    },

    onFetchProducts(data) {
        this.setState({products: data.products});
    },

    onCustomerUpdated(data) {
        this.setState({
            customer: {
                address: data.customer,
                validAddress: data.validAddress
            }
        });
    },

    componentDidMount() {
        Actions.FetchProducts();
    },

    render() {
        return (
            <div>
                <Menu {...this.state} />

                {React.cloneElement(
                    this.props.children,
                    this.state
                )}

                <Footer />

            </div>
        );
    }
});

module.exports = Layout;
