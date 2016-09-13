"use strict";
import React from "react";
import { Grid, Button, Table, Well } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartActions from "../actions/cart";
import CustomerData from "../components/customerdata";

const Checkout = React.createClass ({
    // define espected types for the props
    propTypes: {
        cart: React.PropTypes.array,
        customer: React.PropTypes.object
    },
    // gets defaults values for the props
    getDefaultProps() {
        return {
            cart: [],
            customer: {
                address: {},
                validAddress: false
            }
        };
    },

    render() {
        let CheckoutEnabled = (this.props.customer.validAddress && this.props.cart.length > 0);

        return (
            <Grid>
                <Well bsSize="small">
                    <p>Please confirm your order and checkout your cart.</p>
                </Well>

                <Cart {...this.props} />

                <CustomerData {...this.props} />
                <LinkContainer to="/receipt">
                    <Button
                        disabled={!CheckoutEnabled}
                        bsStyle={CheckoutEnabled? "success": "default"}>
                        Proceed to checkout
                    </Button>
                </LinkContainer>
            </Grid>
        );
    }
});

const Cart = React.createClass ({
    propTypes: {
        cart: React.PropTypes.array
    },

    render() {
        let total = 0;
        this.props.cart.forEach((data) => {
            total += parseFloat(data[Object.keys(data)].price.replace('$', ''));
        });

        let tableData = this.props.cart.map((data, idx) => {
            return <CartElement productData={data} key={idx} />;
        });

        if (! tableData.length) {
            tableData = (
                <tr colSpan="3">
                    <td>Your cart is empty.</td>
                </tr>
            );
        }

        return (
            <Table condensed striped>
                <thead>
                    <tr>
                        <th width="40%">Name</th>
                        <th width="30%">Price</th>
                        <th width="30%"></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                    <tr className="summary" border>
                        <td>
                            <strong>Order total:</strong>
                        </td>
                        <td>
                            <strong>${total}</strong>
                        </td>
                        <td>
                            {tableData.length ?
                            <Button bsSize="xsmall" bsStyle="danger"
                                onClick={CartActions.ClearCart}>
                                Clear Cart
                            </Button> :
                            null}
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
});

const CartElement = React.createClass ({
    render() {
        const title = Object.keys(this.props.productData);
        if (title) {
            return (
                <tr>
                    <td>{title}</td>
                    <td>{this.props.productData[title].price}</td>
                    <td>
                        <Button bsSize="xsmall" bsStyle="danger"
                            onClick={CartActions.RemoveFromCart.bind
                            (null, this.props.productData)}>
                            - Remove
                        </Button>
                    </td>
                </tr>
            );
        } else {
            return null;
        }
    }
});

module.exports = Checkout;
