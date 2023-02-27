import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CreditCardForm from "./CreditCardForm";

export default class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: this.props.location.state.shoppingCart
        ? this.props.location.state.shoppingCart
        : [],
      amount: this.props.location.state.amount
        ? this.props.location.state.amount
        : 0,
      currency: "PEN",
      tax: 0,
      taxReturnBase: 0
    };
  }

  render() {
    const formatter = new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    });
    const selectedProducts = this.state.shoppingCart.map((p, index) => (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>{p.name}</td>
        <td>{formatter.format(p.price)}</td>
      </tr>
    ));
    const totalAmount =
      this.state.amount + this.state.tax * this.state.shoppingCart.length;
    return (
      <div>
        <Header />
        <main className={"container"}>
          <div className={"row"}>
            <div className={"col-md-5"}>
              <h2>Resumen de productos seleccionados</h2>
              <table className={"table"}>
                <thead>
                  <tr>
                    <th scope={"col"}>#</th>
                    <th scope={"col"}>Producto</th>
                    <th scope={"col"}>Valor</th>
                  </tr>
                </thead>
                <tbody>{selectedProducts}</tbody>
              </table>
            </div>
            <div className={"col-md-2"} />
            <div className={"col-md-5"}>
              <h2>Formulario de pago</h2>
              <div className={"row"}>
                <div className={"col-md-3"}>
                  <label htmlFor={"inputAmount"}>Precio productos</label>
                </div>
                <div className={"col-md-9"}>
                  <p id={"inputAmount"}>
                    {" "}
                    {formatter.format(this.state.amount)}{" "}
                  </p>
                </div>
              </div>
              <div className={"row"} style={{ borderBottom: "solid" }}>
                <div className={"col-md-3"}>
                  <label htmlFor={"inputTax"}>Impuesto</label>
                </div>
                <div className={"col-md-9"}>
                  <p id={"inputTax"}>
                    {" "}
                    {formatter.format(this.state.tax) +
                      " x " +
                      this.state.shoppingCart.length +
                      " productos"}{" "}
                  </p>
                </div>
              </div>
              <div className={"row"}>
                <div className={"col-md-3"}>
                  <label htmlFor={"inputTotal"}>Total</label>
                </div>
                <div className={"col-md-9"}>
                  <p id={"inputTotal"}> {formatter.format(totalAmount)} </p>
                </div>
              </div>
            </div>
          </div>
          <CreditCardForm amount={this.state.amount} currency={this.state.currency}/>
        </main>
        <Footer />
      </div>
    );
  }
}
