import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privateKey: "c5dd10aa17c14be59a89480c9a86f09b",
      currency: this.props.location.state.currency
        ? this.props.location.state.currency
        : "PEN",
      amount: this.props.location.state.amount
        ? this.props.location.state.amount
        : 0,
      token: this.props.location.state.token
        ? this.props.location.state.token
        : "",
      payerName: this.props.location.state.payerName
        ? this.props.location.state.payerName
        : "",
      isTokenCreated: this.props.location.state.isTokenCreated
        ? this.props.location.state.isTokenCreated
        : false,
      subscriptionId: "",
      authorization: {
        ticketId: "",
        state: "",
        reference: "",
        type: "",
      },
      capture: {
        ticketId: "",
        state: "",
        reference: "",
        type: "",
      },
      void: {
        ticketId: "",
        state: "",
        reference: "",
        type: "",
      },
      subscriptionInfo: {},
      transactionsList: {},
    };
  }

  handleInputAuthorizePayment = (e) => {
    e.preventDefault();

    const fetch = require("node-fetch");

    let url = `subscriptions/v1/card/${this.state.subscriptionId}/authorize`;

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Private-Merchant-Id": this.state.privateKey,
      },
      body: `{"amount":{"ice":0,"iva":0,"subtotalIva":0,"subtotalIva0":${this.state.amount},"currency":"${this.state.currency}"},"name":"Carlos","lastName":"Medina","email":"carlosandresmedinarivas14@gmail.com","fullResponse":"v2"}`,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Authorization response:");
        console.log(json);
        this.setState({
          authorization: {
            ticketId: json.ticketNumber,
            state: json.details.transactionStatus,
            reference: json.transactionReference,
            type: json.details.transactionType,
          },
        });
      })
      .catch((err) => console.error("error:" + err));
  };

  handleInputCapturePayment = (e) => {
    e.preventDefault();

    const fetch = require("node-fetch");

    let url = `subscriptions/v1/card/${this.state.subscriptionId}/capture`;

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "",
        "Private-Merchant-Id": this.state.privateKey,
      },
      body: `{"ticketNumber":"${this.state.authorization.ticketId}","amount":{"currency":"${this.state.currency}","subtotalIva":0,"iva":0,"subtotalIva0":${this.state.amount},"ice":0},"fullResponse":"v2"}`,
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Capture response:");
        console.log(json);
        this.setState({
          capture: {
            ticketId: json.ticketNumber,
            state: json.details.transactionStatus,
            reference: json.details.transactionReference,
            type: json.details.transactionType,
          },
        });
      })
      .catch((err) => console.error("error:" + err));
  };

  handleInputSubscriptionInfo = (e) => {
    e.preventDefault();

    const fetch = require("node-fetch");

    let url = `subscriptions/v1/card/search/${this.state.subscriptionId}`;

    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Private-Merchant-Id": this.state.privateKey,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Subscription GET Information:");
        console.log(json);
        this.setState({
          subscriptionInfo: json,
        });
      })
      .catch((err) => console.error("error:" + err));
  };

  handleInputVoidPayment = (e) => {
    e.preventDefault();

    const fetch = require("node-fetch");

    let url = `v1/charges/${this.state.capture.ticketId}`;

    let options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Private-Merchant-Id": this.state.privateKey,
      },
      body: '{"fullResponse":"v2"}',
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Void response:");
        console.log(json);
        this.setState({
          void: {
            ticketId: json.ticketNumber,
            state: json.details.transactionStatus,
            reference: json.transactionReference,
            type: json.details.transactionType,
          },
        });
      })
      .catch((err) => console.error("error:" + err));
  };

  handleInputTransactionsList = (e) => {
    e.preventDefault();

    const fetch = require("node-fetch");

    let url =
      "analytics/v1/transactions-list?from=2023-02-26T00:00:00.000&to=2023-02-27T00:00:00.000";

    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Private-Merchant-Id": this.state.privateKey,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log("Transactions List GET Information:");
        console.log(json);
        this.setState({
          transactionsList: json,
        });
      })
      .catch((err) => console.error("error:" + err));
  };

  render() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    let day = currentDate.getDate();
    var subscriptionStartDate = "";
    if (day.toString().length < 2) {
      day = `0${day}`;
    }
    if (month.toString().length < 2) {
      month = `0${month}`;
    }
    subscriptionStartDate = `${year}-${month}-${day}`;
    if (this.state.isTokenCreated) {
      const fetch = require("node-fetch");

      let url = "subscriptions/v1/card";

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Private-Merchant-Id": this.state.privateKey,
        },
        body: `{"token":"${this.state.token}","planName":"Basic Plan Kushki Carlos Shop","periodicity":"custom","contactDetails":{"documentType":"CC","documentNumber":"1009283738","email":"carlosandresmedinarivas14@gmail.com","firstName":"Carlos","lastName":"Medina","phoneNumber":"+593912345678"},"amount":{"subtotalIva":0,"subtotalIva0":${this.state.amount},"ice":0,"iva":0,"currency":"${this.state.currency}"},"startDate":"${subscriptionStartDate}","metadata":{"plan":{"games":{"new":"include","old":"include","beta":"include"}}},"fullResponse":"v2"}`,
      };

      fetch(url, options)
        .then((res) => res.json())
        .then((json) => {
          console.log("Subscription response:");
          if (json.subscriptionId) {
            console.log(json);
            this.setState({
              isTokenCreated: false,
              subscriptionId: json.subscriptionId,
            });
          }
        })
        .catch((err) => console.error("error:" + err));
    }
    return (
      <div>
        <Header />
        <main className={"container"}>
          <div className={"row"}>
            <div className={"col-md-2"} />
            <div className={"col-md-8"}>
              <h4>Token Generado:</h4>
              <small>{this.state.token}</small>
              <br />
              <br />
              <label htmlFor="subscriptionId">Subscription Id</label>
              <input
                value={this.state.subscriptionId}
                id="subscriptionId"
                disabled
              />
              <br />
              <br />
              <input
                type="button"
                value="Autorizar pago"
                onClick={this.handleInputAuthorizePayment}
                className={"btn btn-color"}
              />
              <br />
              <h4>Respuesta Autorización:</h4>
              <label htmlFor="ticketId">Ticket Number:</label>
              <input
                value={this.state.authorization.ticketId}
                id="ticketId"
                disabled
              />
              <br />
              <label htmlFor="state">Estado de la Transacción:</label>
              <input
                value={this.state.authorization.state}
                id="state"
                disabled
              />
              <br />
              <label htmlFor="reference">Referencia de la Transacción:</label>
              <input
                value={this.state.authorization.reference}
                id="reference"
                disabled
              />
              <br />
              <label htmlFor="type">Tipo de Transacción:</label>
              <input value={this.state.authorization.type} id="type" disabled />
              <br />
              <br />
              <input
                type="button"
                value="Capturar pago"
                onClick={this.handleInputCapturePayment}
                className={"btn btn-color"}
              />
              <br />
              <h4>Respuesta Captura:</h4>
              <label htmlFor="ticketIdC">Ticket Number:</label>
              <input
                value={this.state.capture.ticketId}
                id="ticketIdC"
                disabled
              />
              <br />
              <label htmlFor="stateC">Estado de la Transacción:</label>
              <input value={this.state.capture.state} id="stateC" disabled />
              <br />
              <label htmlFor="referenceC">Referencia de la Transacción:</label>
              <input
                value={this.state.capture.reference}
                id="referenceC"
                disabled
              />
              <br />
              <label htmlFor="typeC">Tipo de Transacción:</label>
              <input value={this.state.capture.type} id="typeC" disabled />
              <br />
              <br />
              <input
                type="button"
                value="Obtener Información de la suscripción"
                onClick={this.handleInputSubscriptionInfo}
                className={"btn btn-color"}
              />
              <br />
              <h4>Información de la suscripción:</h4>
              <textarea
                class="form-control"
                id="textAreaExample2"
                rows="8"
                value={JSON.stringify(this.state.subscriptionInfo)}
              ></textarea>
              <br />
              <br />
              <input
                type="button"
                value="Anular pago"
                onClick={this.handleInputVoidPayment}
                className={"btn btn-color"}
              />
              <br />
              <h4>Respuesta Anulación:</h4>
              <label htmlFor="ticketIdV">Ticket Number:</label>
              <input value={this.state.void.ticketId} id="ticketIdV" disabled />
              <br />
              <label htmlFor="stateV">Estado de la Transacción:</label>
              <input value={this.state.void.state} id="stateV" disabled />
              <br />
              <label htmlFor="referenceV">Referencia de la Transacción:</label>
              <input
                value={this.state.void.reference}
                id="referenceV"
                disabled
              />
              <br />
              <label htmlFor="typeV">Tipo de Transacción:</label>
              <input value={this.state.void.type} id="typeV" disabled />
              <br />
              <br />
              <input
                type="button"
                value="Obtener Lista de Transacciones"
                onClick={this.handleInputTransactionsList}
                className={"btn btn-color"}
              />
              <br />
              <h4>Información de la suscripción:</h4>
              <textarea
                class="form-control"
                id="textAreaExample2"
                rows="8"
                value={JSON.stringify(this.state.transactionsList)}
              ></textarea>
            </div>
            <div className={"col-md-2"} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}
