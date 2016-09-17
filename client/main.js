import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient();

@graphql(gql`
  query getCookies {
    cookies
  }
`, { options: { pollInterval: 150 } } )
class Jar extends Component {
  render() {
    return <h1>{this.props.data.loading ? 'Opening the jar...' : `You have ${this.props.data.cookies} 🍪`}</h1>
  }
}

@graphql(gql`
  mutation addCookie {
    addCookie
  }
`)
class Cookie extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="Cookie" onClick={() => this.props.mutate()}>
        <img src="/cookie.png" />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jar />
        <Cookie />
      </div>
    );
  }
} 

// const CookieJar = graphql(gql`
//   query getCookies {
//     cookies
//   }
// `)(App);

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'));