import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/header";
import Products from './pages/products';
import Index from './pages/index';
import Car from './pages/car';
import Pruebas from "./pages/pruebas";

class App extends Component {
  constructor() {
    super();
  }
render() {
 return (
  <Router> 
    <Header /> 
    <Route exact path="/">
      <Index/>  
    </Route> 
    <Route path="/products">
      <Products/>  
    </Route>
    <Route path="/contact">
      <Pruebas/>
    </Route> 
    <Route path="/car">
      <Car/>
    </Route>
  </Router>
 );
 }
}
export default App;
