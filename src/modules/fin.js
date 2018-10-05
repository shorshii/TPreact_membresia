import React, { Component } from 'react';
import logo from './disco.svg';
import '../App.css'; 

class Fin extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to Apolo </h1>
            </header>
            <p className="App-intro">
              ¡Gracias! Te enviaremos un correo para confirmar tu cuenta.
            </p> 
            <footer className="footer">Taller de Practica II - IFTS 16 - Alumna: Georgina Valenzano ifts 16 </footer>
        </div>
          
      );
    }
}
export default Fin;