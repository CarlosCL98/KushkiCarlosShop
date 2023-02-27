import React from "react";
import { Kushki } from "@kushki/js";
import "./CreditCardForm.css";
import { Redirect } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCreditCard } from "@mdi/js";

export default class CreditCardForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: "6a136b3686ea43eb90eb19256913e894",
      amount: this.props.amount ? this.props.amount : "0",
      currency: this.props.currency ? this.props.currency : "PEN",
      token: "",
      creditCardHolderName: "",
      creditCardNumber: "",
      creditCardExpiryMonth: "",
      creditCardExpiryYear: "",
      creditCardCvv: "",
      isTokenCreated: false,
    };
  }
  handleOnSubmit = (e) => {
    e.preventDefault();
    // Initialize Kushki JS
    var kushki = new Kushki({
      merchantId: this.state.publicKey,
      inTestEnvironment: true,
      regional: false,
    });

    kushki.requestSubscriptionToken(
      {
        card: {
          name: this.state.creditCardHolderName,
          number: this.state.creditCardNumber,
          cvc: this.state.creditCardCvv,
          expiryMonth: this.state.creditCardExpiryMonth,
          expiryYear: this.state.creditCardExpiryYear,
        },
        currency: this.state.currency,
      },
      (response) => {
        if (!response.code) {
          // Submit your code to your back-end
          console.log("Token creation response: " + response.token);
          this.setState({
            publicKey: this.state.publicKey,
            amount: this.state.amount,
            currency: this.state.currency,
            token: response.token,
            creditCardHolderName: this.state.creditCardHolderName,
            creditCardNumber: "",
            creditCardExpiryMonth: "",
            creditCardExpiryYear: "",
            creditCardCvv: "",
            isTokenCreated: true,
          });
        } else {
          console.error(
            "Error: ",
            response.error,
            "Code: ",
            response.code,
            "Message: ",
            response.message
          );
        }
      }
    );
  };

  handleInputName = (e) => {
    e.preventDefault();
    this.setState({
      publicKey: this.state.publicKey,
      amount: this.state.amount,
      currency: this.state.currency,
      token: this.state.token,
      creditCardHolderName: e.target.value,
      creditCardNumber: this.state.creditCardNumber,
      creditCardExpiryMonth: this.state.creditCardExpiryMonth,
      creditCardExpiryYear: this.state.creditCardExpiryYear,
      creditCardCvv: this.state.creditCardCvv,
      isTokenCreated: this.state.isTokenCreated,
    });
  };

  handleInputNumber = (e) => {
    e.preventDefault();
    this.setState({
      publicKey: this.state.publicKey,
      amount: this.state.amount,
      currency: this.state.currency,
      token: this.state.token,
      creditCardHolderName: this.state.creditCardHolderName,
      creditCardNumber: e.target.value,
      creditCardExpiryMonth: this.state.creditCardExpiryMonth,
      creditCardExpiryYear: this.state.creditCardExpiryYear,
      creditCardCvv: this.state.creditCardCvv,
      isTokenCreated: this.state.isTokenCreated,
    });
  };

  handleInputMonth = (e) => {
    e.preventDefault();
    var month = e.target.value;
    if (month.length < 2) {
      month = "0" + month;
    }
    this.setState({
      publicKey: this.state.publicKey,
      amount: this.state.amount,
      currency: this.state.currency,
      token: this.state.token,
      creditCardHolderName: this.state.creditCardHolderName,
      creditCardNumber: this.state.creditCardNumber,
      creditCardExpiryMonth: month,
      creditCardExpiryYear: this.state.creditCardExpiryYear,
      creditCardCvv: this.state.creditCardCvv,
      isTokenCreated: this.state.isTokenCreated,
    });
  };

  handleInputYear = (e) => {
    e.preventDefault();
    var year = e.target.value;
    this.setState({
      publicKey: this.state.publicKey,
      amount: this.state.amount,
      currency: this.state.currency,
      token: this.state.token,
      creditCardHolderName: this.state.creditCardHolderName,
      creditCardNumber: this.state.creditCardNumber,
      creditCardExpiryMonth: this.state.creditCardExpiryMonth,
      creditCardExpiryYear: year.slice(-2),
      creditCardCvv: this.state.creditCardCvv,
      isTokenCreated: this.state.isTokenCreated,
    });
  };

  handleInputCvv = (e) => {
    e.preventDefault();
    this.setState({
      publicKey: this.state.publicKey,
      amount: this.state.amount,
      currency: this.state.currency,
      token: this.state.token,
      creditCardHolderName: this.state.creditCardHolderName,
      creditCardNumber: this.state.creditCardNumber,
      creditCardExpiryMonth: this.state.creditCardExpiryMonth,
      creditCardExpiryYear: this.state.creditCardExpiryYear,
      creditCardCvv: e.target.value,
      isTokenCreated: this.state.isTokenCreated,
    });
  };

  render() {
    var tokenInformation = "";
    if (this.state.token != "") {
      tokenInformation = "Token Creado: " + this.state.token;
    }
    if (this.state.isTokenCreated) {
      return (
        <Redirect
          to={{
            pathname: "/subscription",
            state: {
              token: this.state.token,
              currency: this.state.currency,
              amount: this.state.amount,
              payerName: this.state.creditCardHolderName,
              isTokenCreated: this.state.isTokenCreated,
            },
          }}
        />
      );
    }
    return (
      <form onSubmit={this.handleOnSubmit}>
        <div class="padding">
          <div class="row">
            <div class="col-sm-6">
              <div class="card">
                <div class="card-header">
                  <strong>Tarjeta de Crédito</strong>
                  <br />
                  <small>Ingresa los datos de tu tarjeta</small>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label htmlFor="name">Nombre</label>
                        <input
                          class="form-control"
                          id="name"
                          type="text"
                          placeholder="Ingresa tu nombre"
                          onChange={this.handleInputName}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="form-group">
                        <label htmlFor="ccnumber">
                          Número tarjeta de crédito / Débito
                        </label>
                        <div class="input-group">
                          <input
                            class="form-control"
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            autocomplete="crediCard"
                            onChange={this.handleInputNumber}
                          />
                          <div class="input-group-append">
                            <span class="input-group-text">
                              <Icon path={mdiCreditCard} size={1} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-sm-4">
                      <label htmlFor="ccmonth">Mes</label>
                      <select
                        class="form-control"
                        id="ccmonth"
                        onChange={this.handleInputMonth}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                      </select>
                    </div>
                    <div class="form-group col-sm-4">
                      <label for="ccyear">Year</label>
                      <select
                        class="form-control"
                        id="ccyear"
                        onChange={this.handleInputYear}
                      >
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                        <option>2027</option>
                        <option>2028</option>
                        <option>2029</option>
                        <option>2030</option>
                        <option>2031</option>
                        <option>2032</option>
                        <option>2033</option>
                        <option>2034</option>
                        <option>2035</option>
                      </select>
                    </div>
                    <div class="col-sm-4">
                      <div class="form-group">
                        <label for="cvv">CVV/CVC</label>
                        <input
                          class="form-control"
                          id="cvv"
                          type="text"
                          placeholder="123"
                          onChange={this.handleInputCvv}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer">
                  <input
                    name="Submit"
                    type="submit"
                    className={"btn btn-color"}
                    value="Suscribirse"
                  />
                  <br />
                  <small id="tokenInformation">{tokenInformation}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
