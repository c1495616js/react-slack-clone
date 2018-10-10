import React, { Component } from 'react'
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import firebase from '../../firebase';

import { Link } from 'react-router-dom'


export default class Login extends Component {
  state = {    
    email: '',
    password: '',    
    errors: [],
    loading: false,    
  };

  
  displayErrors = errors => errors.map((error, i)=> <p key={i}>{error.message}</p>);

  handleChange = event => {    
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault();
    if(!this.isFormValid(this.state)) return
    this.setState({ errors: [], loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser)
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        })
      })
  }

  isFormValid = ({ email, password }) => email && password;
  
  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" icon color="violet" textAlign="center">
            <Icon name="puzzle piece" color="violet"/>
            Login to DevChat
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>              

              <Form.Input fluid name="email" icon="mail" iconPosition="left"
                className={this.handleInputError(errors, "email")}
                placeholder="Email Address" onChange={this.handleChange} value={email}  type="email"/>

              <Form.Input fluid name="password" icon="lock" iconPosition="left"
              className={this.handleInputError(errors, "password")}
              placeholder="Password" onChange={this.handleChange} value={password} type="password"/>

              

              <Button color="violet" fluid size="large" disabled={loading}
              className={loading ? "loading" : ""}>Submit</Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Don't have an account? <Link to="/register" >Register</Link></Message>

        </Grid.Column>
      </Grid>
    )
  }
}
