import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="my-app">
        <ProductList/>

      </div>
    );
  }
}

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    alert('Submitting '+this.refs.name.value);
    var product = {
      name: this.refs.name.value,
      description: this.refs.description.value,
      price: parseInt(this.refs.price.value) || 0
    }
    this.props.handleCreate(product);

    this.refs.name.value = "";
    this.refs.description= "";
    this.refs.price.value = "";
  }

  render() {
    return (
      <form onSubmit = {this.submit}>
        <input type="text" placeholder="Item Name" ref="name" />
        <input type="text" placeholder="Item Description" ref="description" />
        <input type="text" placeholder="Item Price" ref="price" />
        <br/>
        <button>Create</button>
        <hr/>
      </form>
    );
  }
}

class Total extends Component {
  render(){
    return(
      <div>
        <h3>Total: ${this.props.total}</h3>
      </div>
    )
  }
}

class ProductList extends Component {
constructor (props) {
  super(props);
  this.state = {total: 0,
    items: [
      {name:"Lenovo", description: "Core i5 - 4Gb ram - 256Gb SSD", price: 540},
      {name:"Dell", description: "Core i7 - 8Gb ram - 1Tb HDD", price: 700},
      {name:"Asus", description: "Core i3 - 4Gb ram - 512Gb HDD", price: 430}
          ]
        }
  this.calculate = this.calculate.bind(this);
  this.createProduct = this.createProduct.bind(this);
}

  createProduct(item) {
    this.setState({
      items: this.state.items.concat(item)
    });
  }

  calculate(price) {
    this.setState({total: this.state.total + price});
  }

  showDetails(name) {
    alert("This item "+name+" is available for free shipping.");
  }
  render() {
    var theThis = this;
    var items = this.state.items.map(function(item) {
      return(
        <Products name={item.name} description={item.description} price={item.price}
        handleShow={theThis.showDetails}
        handleTotal={theThis.calculate}
        />
        );
      });
      return (
        <div>
          {items}
          <Total total={this.state.total}/>
          <ProductForm handleCreate={this.createProduct}/>
        </div>
      );
    }
}

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {amount: 0 };
    this.buy = this.buy.bind(this);
    this.show = this.show.bind(this);
  }

  show() {
    this.props.handleShow(this.props.name);
  }

  buy() {
    this.setState({amount: this.state.amount + 1});
    this.props.handleTotal(this.props.price);
  }

  render(){
    return (
      <div>
        <h4>{this.props.name}</h4>

        <p>{this.props.description}</p>
        <button onClick={this.buy}>Buy</button>
        <button onClick={this.show}>Show</button>
        <span> ${this.props.price}</span>
        <span> (Cart: {this.state.amount} items.)</span>
        <hr/>
      </div>
    );
  }
}

export default App;
