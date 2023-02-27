import React from "react";

export default class Product extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price,
      image: this.props.image
    };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(e) {
    e.preventDefault();
    this.props.handleAddToCart(this.state);
  }

  render() {
    const formatter = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });
    return (
      <div className="card">
        <div className={"card-image"}>
          <img src={this.state.image} className="card-img-top" alt="Product"/>
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.state.name}</h5>
          <p className="card-text"><strong>Precio:</strong> {formatter.format(this.state.price)}</p>
          <a href="#" className="btn btn-color" onClick={this.handleOnClick}>Añadir al carrito</a>
        </div>
      </div>
    );
  }
}