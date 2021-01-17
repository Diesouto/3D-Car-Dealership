import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/header";
import Products from './pages/products';
import Index from './pages';
import Car from './pages/car';
import Footer from './components/footer';
class App extends Component {
  constructor() {
    super();
  }
render() {
 return (
  <Router> 
    <Header /> 
    <Route exact path="/" component={()=><Index/>}/>  
    <Route path="/products" component={()=><Products/>}/> 
    <Route path="/car" component={()=><Car/>}/> 
  </Router>
 );
 }
}
export default App;
