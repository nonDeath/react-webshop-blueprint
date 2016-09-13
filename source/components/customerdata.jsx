"use strict";

import React from "react";
import { Input, Button } from "react-bootstrap";
import CustomerActions from "../actions/customer";

const CustomerData = React.createClass ({
    getDefaultProps() {
        return {
            customer: {
                address: {},
                validAddress: false
            }
        };
    },

    getInitialState() {
        return {
            customer: {
                name: this.props.customer.address.name ? this.props.customer.address.name : "",
                address: this.props.customer.address.address ? this.props.customer.address.address : "",
                zipCode: this.props.customer.address.zipCode ? this.props.customer.address.zipCode : "",
                city: this.props.customer.address.city ? this.props.customer.address.city : ""
            },
            validAddress: this.props.customer.validAddress ? this.props.customer.validAddress : false
        };
    },

    validationStateName() {
        if (this.state.customer.name.length > 5) {
            return "success";
        } else if (this.state.customer.name.length > 2) {
            return "warning";
        } else {
            return "error";
        }
    },

    validationStateAddress() {
        if (this.state.customer.address.length > 5) {
            return "success";
        } else if (this.state.customer.address.length > 2) {
            return "warning";
        } else {
            return "error";
        }
    },

    validationStateZipCode() {
        if (this.state.customer.zipCode.length > 5) {
            return "success";
        } else if (this.state.customer.zipCode.length > 2) {
            return "warning";
        } else {
            return "error";
        }
    },

    validationStateCity() {
        if (this.state.customer.city.length > 5) {
            return "success";
        } else if (this.state.customer.city.length > 2) {
            return "warning";
        } else {
            return "error";
        }
    },

    checkAllValidations() {
        return ("success" == this.validationStateName() &&
            "success" == this.validationStateAddress() &&
            "success" == this.validationStateZipCode() &&
            "success" == this.validationStateCity()
        );
    },

    handleChangeName(event) {
        let state = Object.assign({}, this.state);
        state.customer.name = this.refs.inputName.getValue();
        state.validAddress = this.checkAllValidations();
        this.setState(state);
        CustomerActions.SaveAddress(state);
    },

    handleChangeAddress(event) {
        let state = Object.assign({}, this.state);
        state.customer.address = this.refs.inputAddress.getValue();
        state.validAddress = this.checkAllValidations();
        this.setState(state);
        CustomerActions.SaveAddress(state);
    },

    handleChangeZipCode(event) {
        let state = Object.assign({}, this.state);
        state.customer.zipCode = this.refs.inputZipCode.getValue();
        state.validAddress = this.checkAllValidations();
        this.setState(state);
        CustomerActions.SaveAddress(state);
    },

    handleChangeCity(event) {
        let state = Object.assign({}, this.state);
        state.customer.city = this.refs.inputCity.getValue();
        state.validAddress = this.checkAllValidations();
        this.setState(state);
        CustomerActions.SaveAddress(state);
    },

    render() {
        return (
            <div>
                <Input type="text"
                    value={this.state.customer.name}
                    placeholder="Enter your name"
                    label="Name"
                    bsStyle={ this.validationStateName() }
                    hasFeedback
                    ref="inputName"
                    onChange={this.handleChangeName} />

                <Input type="text"
                    value={this.state.customer.address}
                    placeholder="Enter your street address"
                    label="Street"
                    bsStyle={ this.validationStateAddress() }
                    hasFeedback
                    ref="inputAddress"
                    onChange={this.handleChangeAddress} />

                <Input type="text"
                    value={this.state.customer.zipCode}
                    placeholder="Enter your zip code"
                    label="Zip Code"
                    bsStyle={ this.validationStateZipCode() }
                    hasFeedback
                    ref="inputZipCode"
                    onChange={this.handleChangeZipCode} />

                <Input type="text"
                    value={this.state.customer.city? this.state.customer.city: this.state.customer.city}
                    placeholder="Enter your city"
                    label="City"
                    bsStyle={ this.validationStateCity() }
                    hasFeedback
                    ref="inputCity"
                    onChange={this.handleChangeCity} />
            </div>
        );
    }
});

module.exports = CustomerData;
