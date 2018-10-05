import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import '../App.css';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import logo from './disco.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css';
import MenuItem from '@material-ui/core/MenuItem';

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
const listaCountries = require('country-list')();
const countries = listaCountries.getNames();
class Planilla extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      country: '',
      region: '',
      apellido:'',
      nombre:'',
      expiry: '',
      cvc:'',
      number:'',
      email:'',
      tipo: '',
      nombreUsuario:''
    };
  }
 
  selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectTipo (val) {
    this.setState({ tipo: val });
  }

  selectRegion (val) {
    this.setState({ region: val });
  }

  handleChangeCNumber = (event) => {
    this.setState({ number: event.target.value });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleChangeExpiry = (event) => {
    this.setState({ expiry: event.target.value });
  }

  handleChangeCVC = (event) => {
    this.setState({ cvc: event.target.value });
  }

  handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  handleChangeApellido(event) {
    this.setState({ apellido: event.target.value });
  }

  handleChangeNombreUsuario(event) {
    this.setState({ nombreUsuario: event.target.value });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  
  componentDidMount () {
    this.setState({ tipo: this.props.location.state })
  }

  payment(){
    console.log('CUENTA' + this.state.tipo)
    if (this.state.tipo === 'premium'){
      return (<div>
                <div>
                    <h4>USD 10,00</h4>
                </div>
                <CreditCardInput
                    cardNumberInputProps={{ onChange: this.handleChangeCNumber }}
                    cardExpiryInputProps={{ onChange: this.handleChangeExpiry}}
                    cardCVCInputProps={{ onChange: this.handleChangeCVC }}
                    fieldClassName="input"
                />
                <Cards
                    number={this.state.number}
                    name={this.state.nombre}
                    expiry={this.state.expiry}
                    cvc={this.state.cvc}
                    focused={''}
                />
              </div>);
    }
  }

  confirmarSuscripcion(tipo){
    if (tipo === 'premium') {
      var usuario = {
        tipo: this.state.tipo.toLowerCase().replace(/\s/g,''),
        nombre: this.state.nombre.toLowerCase().replace(/\s/g,''),
        apellido:this.state.apellido.toLowerCase().replace(/\s/g,''),
        email: this.state.email.toLowerCase().replace(/\s/g,''),
        pais: this.state.country.toLowerCase().replace(/\s/g,''),
        cardNumber: this.state.number,
        cardExpiry: this.state.expiry,
        cardVc: this.state.cvc,
      } 
    } else {
      var usuario = {
        tipo: this.state.tipo.toLowerCase().replace(/\s/g,''),
        nombre: this.state.nombre.toLowerCase().replace(/\s/g,''),
        apellido:this.state.apellido.toLowerCase().replace(/\s/g,''),
        email: this.state.email.toLowerCase().replace(/\s/g,''),
        pais: this.state.country.toLowerCase().replace(/\s/g,''),
      }
    };
  
    fetch('https://server-subscripcion-jsbrbnwqfv.now.sh/subscripciones', {
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
      body: JSON.stringify(usuario, '\t')
		})
		.then((response) => {
			return response.json();
		})
		.then((usuario) => {
			console.log('Objeto posteado:', usuario);
		})
		.catch((error) => {
			console.log(error, 'catch the hoop');
		});
	};
  render(){ 
    const {country,  nombreUsuario, nombre, apellido, email, number, expiry, cvc, tipo} = this.state;
    const { classes } = this.props;
    let isEnable;
    if (tipo === 'premium') {
			isEnable =
				email.length > 0 &&
        nombre.length > 0 &&
        apellido.length > 0 &&
				country.length > 0 &&
				number.length > 0 &&
				expiry.length > 0 &&
        cvc.length > 0;
    } else {
      isEnable = 
        ((nombre.length > 0) &&
        (apellido.length > 0) &&
        (country.length > 0) &&
        (email.length > 0) &&
        (nombreUsuario.length > 0))
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Apolo </h1>
      </header>
      <p className="App-intro">
          Datos Personales. 
      </p> <hr />
      <div className = "country" >
        <React.Fragment>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nombreUsuario"
                name="nombreUsuario"
                label="Nombre de Usuario"
                onChange={this.handleChangeNombreUsuario.bind(this)}
                fullWidth
                autoComplete="nombreUSuario"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                fullWidth
                onChange={this.handleChangeNombre.bind(this)}
                autoComplete="nombre"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="apellido"
                name="apellido"
                label="Apellido"
                onChange={this.handleChangeApellido.bind(this)}
                fullWidth
                autoComplete="apellido"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                onChange={this.handleChangeEmail.bind(this)}
                fullWidth
                autoComplete="email"
              />
            </Grid>
            <Grid className="country"  >
              <TextField
                id="pais"
                select
                label="Pais"
                className={classes.textField}
                variant="outlined"
                fullWidth
                value={this.state.country}
                onChange={this.handleChange('country')}
                SelectProps={{
                  MenuProps: {className: classes.menu,},
                }}
                helperText="Seleccione el Pais correspondiente"
                margin="normal">
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid> 
            <Grid className = "tarjeta">
              <div>{this.payment(this.state.tipo)}</div>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
      <Grid item xs={12}>
       <FormControlLabel
           control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
           label="Acepta las Condiciones"
            />
      </Grid>
      <Grid>
        <Button type='button' 
         disabled={!isEnable}
         variant='contained'
			   color='primary'onClick={() => {this.confirmarSuscripcion(tipo)}}
       ><Link to={{
           pathname: './fin',
         }}> ACEPTAR </Link>
        </Button>
      </Grid>
      <footer className="footer2"><p>Taller de Practica II - IFTS 16 - Alumna: Georgina Valenzano ifts 16</p> </footer>    
    </div>
       
  );
  }
}

Planilla.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Planilla);