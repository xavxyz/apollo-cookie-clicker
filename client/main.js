import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient();

class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h1>{this.props.data.loading ? 'Opening the jar...' : `You have ${this.props.data.cookies}`}</h1>
        <div className="Cookie">
          <img src="/cookie.png" />
        </div>
      </div>
    );
  }
} 

const CookieJar = graphql(gql`
  query getCookies {
    cookies
  }
`)(App);

ReactDOM.render(<ApolloProvider client={client}><CookieJar /></ApolloProvider>, document.getElementById('root'));