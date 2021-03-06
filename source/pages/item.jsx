"use strict";
import React from "react";
import Reflux from "reflux";
import { Router, State } from "react-router";
import { Grid, Row, Col, Button } from "react-bootstrap";
import CartActions from "../actions/cart";

const Item = React.createClass ({
    mixins: [
        Router.State
    ],

    render() {
        if (! this.props.products) {
            return null;
        }

        // get the product from the props
        let product = this.props.products.main_offering.
            concat(this.props.products.sale_offerings).
            filter(item => {
                return item[Object.keys(item)].SKU === this.props.routeParams.id;
            });

        if (! product.length) {
            return (<Grid>
                <Row>
                    <Col xs={12}>
                        <h1>Product missing</h1>
                        <p>
                            :'-( I'm sorry but the product could not be found.
                        </p>
                    </Col>
                </Row>
            </Grid>);
        } else {
            return (<Grid>
                <Row>
                    <Col xs={12}>
                        <ProductInfo productData={product[0]}/>
                    </Col>
                </Row>
            </Grid>);
        }
    }
});

const ProductInfo = React.createClass ({
    propTypes: {
        productData: React.PropTypes.object
    },

    render() {
        const title = Object.keys(this.props.productData);
        if (this.props.productData[title]) {
            return (<Col xs={12}>
                <Col md={3} sm={4} xs={12}>
                  <p>
                    <img src={this.props.productData[title].
                      image.replace("{size}","200x150")}/>
                  </p>
                </Col>
                <Col md={9} sm={8} xs={12}>
                  <h4>{title}</h4>

                  <p>
                    {this.props.productData[title].description}
                    </p>

                    <p>
                      {this.props.productData[title].price}
                      {" "}
                      ({this.props.productData[title].savings})
                    </p>

                    <p>
                      <Button title="Add me to cart!"
                        onClick={CartActions.AddToCart.bind(null, this.props.productData)}>
                        + Add to cart!
                      </Button>
                    </p>
                  </Col>
                </Col>
            );
        } else {
            return null;
        }
    }
});

module.exports = Item;
