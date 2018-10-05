import React, { Component } from 'react';
import logo from './disco.svg';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import '../App.css'; 
import PropTypes from 'prop-types';

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	chip: {
		margin: theme.spacing.unit / 4
	}
});

class Home extends Component {
  
  render() {
    const { classes } = this.props;
    const premium = props => <Link to={{pathname: '/planilla', state: 'premium' }} {...props}/>
    const free = props => <Link to={{pathname: '/planilla', state: 'free'}}  {...props}/>
    return (
      
          <div className="App">
            <header className="App-header">
               <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to Apolo </h1>
            </header>
            <p className="App-intro">
              ¡Bienvenido! Crea tu cuenta para comenzar tu membresia.
            </p> 
          
            <div className = "pepe1">
              <div className="left">
                <p>Free</p><hr />
                  <ul className ="ul1">
                    <li> Musica gratis en cualquier dispositivo ✔️ </li>
                    <li> Sin publicidad ❌ </li>
                    <li> Disponible sin conexión ❌ </li>
                  </ul>
              </div>
                <Button type='button' component={free} focusRipple variant='contained' 
			      	          color='primary'className={classes.button}> GET FREE 
                </Button>
            </div> 
            <div className ="pepe2">
              <div className="right">
                <p><b>Premium</b></p> <hr />
                  <ul className ="ul2">
                    <li> Musica gratis en cualquier dispositivo  ✔️ </li> 
                    <li> Sin publicidad ✔️ </li>
                    <li> Disponible sin conexión ✔️ </li>
                  </ul>
              </div>
              <Button type='button' component={premium} focusRipple variant='contained' 
			      	        color='secondary'className={classes.button}> GET PREMIUM 
              </Button>
            </div> 
            <footer className="footer"><p>Taller de Practica II - IFTS 16 - Alumna: Georgina Valenzano ifts 16</p> </footer>
          </div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);