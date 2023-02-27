import React from "react";
import Product from "./Product";

export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [
        { name: "Nintendo Switch",
          price: 785.30,
          image: "https://media.aws.alkosto.com/media/catalog/product/cache/6/image/69ace863370f34bdf190e4e164b6e123/n/i/nintendoswitchneon.jpg"
        },
        { name: "Xbox One",
          price: 1177.94,
          image: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3SQnt?ver=5797&q=90&m=6&h=1445&w=1849&b=%23FFFFFFFF&f=jpg&o=f&aim=true"
        },
        { name: "PlayStation 4",
          price: 1060.15,
          image: "http://www.costco.com.mx/medias/sys_master/products/hca/h71/11253861908510.jpg"
        },
        { name: "God Of War Game PS4",
          price: 62.82,
          image: "https://static.raru.co.za/cover/2019/10/09/7821671-m.jpg?v=1570786535"
        },
        { name: "Legend Of Zelda BOTW Switch",
          price: 137.43,
          image: "https://media.vandal.net/m/43030/the-legend-of-zelda-breath-of-the-wild-201732131429_1.jpg"
        },
        { name: "Dragon Ball Z Kakarot PS4",
          price: 180.62,
          image: "http://www.gamecored.com/wp-content/uploads/2019/12/Screen-Shot-2019-12-08-at-5.30.24-PM.png"
        },
        { name: "The Binding of Issac Switch",
          price: 58.90,
          image: "https://www.mobygames.com/images/covers/l/387006-the-binding-of-isaac-afterbirth-nintendo-switch-inside-cover.jpg"
        },
        { name: "Minecraft PC Edition",
          price: 39.26,
          image: "https://http2.mlstatic.com/minecraft-cover-fkt-pc-D_NQ_NP_659358-MLA32116104277_092019-F.jpg"
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