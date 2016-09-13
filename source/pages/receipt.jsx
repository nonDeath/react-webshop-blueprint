"use strict";
import React from "react";
import { Grid, Row, Col, Panel, Table } from "react-bootstrap";
import {Router, Navigation} from "react-router";
import CartActions from "../actions/cart";


const Receipt = React.createClass ({
    propTypes: {
        cart: React.PropTypes.array,
        customer: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            cart: [],
            customer: {
                address: {},
                validAddress: false
            }
        };
    },

    mixins: [
        Navigation
    ],

    componentDidMount() {
        if (!this.props.cart.length) {
            this.props.history.pushState('/');
        }
    },

    componentWillUnmount() {
        CartActions.ClearCart();
    },

    render() {
        let total = 0;
        this.props.cart.forEach((data) => {
            total += parseFloat(data[Object.keys(data)].price.replace("$", ""));
        });
        let orderData = this.props.cart.map((data, idx) => {
            return <OrderElement productData={data} key={idx} />
        });

        return (
            <Grid>
                <Row>
                    <Col xs={12}>
                        <h3 className="text-center">Invoice for your purchase</h3>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} pullLeft>
                        <Panel header={"Billing details"}>
                            <strong>Name:</strong> {this.props.customer.address.name}<br/>
                            <strong>Street address:</strong> {this.props.customer.address.address}<br/>
                            <strong>Zip Code:</strong> {this.props.customer.address.zipCode}<br/>
                            <strong>City:</strong> {this.props.customer.address.city}<br/>
                        </Panel>
                    </Col>

                    <Col xs={12} md={12}>
                        <Panel header={"Order Summary"}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Item Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orderData}

                                    <tr>
                                        <td><strong>Total:</strong></td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

const OrderElement = React.createClass ({
    render() {
        const title = Object.keys(this.props.productData);
        if (title) {
            return (
                <tr>
                    <td>{title}</td>
                    <td>{this.props.productData[title].price}</td>
                </tr>
            );
        } else {
            return null;
        }
    }
});

module.exports = Receipt;
