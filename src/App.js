import React from 'react';
import './App.css';
import {Redirect} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./components/Products";

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: [],
      amount: 0,
      buy: false
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.setState({buy: true});
  }

  handleAddToCart(product) {
    this.setState({
      shoppingCart: this.state.shoppingCart.concat(product),
      amount: this.state.amount + product.price
    }, () => {
      alert("Se agregó el producto al carrito.");
    });
  }

  render() {
    if (this.state.buy) {
      return <Redirect to={{
        pathname: "/shoppingCart", state: {
          shoppingCart: this.state.shoppingCart,
          amount: this.state.amount
        }
      }}/>
    }
    return (
      <div>
        <Header />
        <main className={"container"}>
          <div className={"title"}>
            <h2>Nuestros productos</h2>
            <a className={"btn btn-color"} onClick={this.handleOnClick}><img
              src={"https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-svg-png-icon-download-28.png"}/> {this.state.shoppingCart.length}
            </a>
          </div>
          <Products handleAddToCart={this.handleAddToCart}/>
        </main>
        <Footer />
      </div>
    );
  }
}