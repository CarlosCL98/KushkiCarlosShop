import React from "react";
import Product from "./Product";

export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [
        { name: "Suscripción Básica Game Pass",
          price: 100.00,
          image: "https://http2.mlstatic.com/D_NQ_NP_644334-MCO50357914513_062022-O.jpg"
        },
        { name: "Suscripción Premium Game Pass",
          price: 215.54,
          image: "https://carulla.vtexassets.com/arquivos/ids/1196033/Xbox-Game-Pass-Ultimate-para-1-Mes---Incluye-Live-Gold-y-Acceso-ilimitado.jpg?v=637230326911230000"
        },
        { name: "Suscripción VIP Game Pass",
          price: 500.99,
          image: "https://media.gamestop.com/i/gamestop/11094793/Xbox-Game-Pass-1-Month-Ultimate-Membership"
        }
      ]
    }
  }

  render() {
    const productsList = this.state.products.map( (p, index) => (
      <Product key={index} name={p.name} price={p.price} image={p.image} handleAddToCart={this.props.handleAddToCart}/>
    ));
    return (
      <div>
        <div className={"products-grid"}>
          {productsList}
        </div>
      </div>
    );
  }
}