import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const client = new ApolloClient();

@graphql(gql`
  mutation addCookie {
    addCookie
  }
`)
class Cookie extends Component {
  render() {
    return (
      <div className="Cookie" onClick={ () => { this.props.mutate(); this.props.refetchJar(); } }>
        <img src="/cookie.png" />
      </div>
    );
  }
}

/*
@graphql(gql`
  query getCookies {
    cookies
  }
`, { options: { pollInterval: 150 } } )
*/
@graphql(gql`
  query getCookies {
    cookies
  }
`)
class Jar extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.data.loading ? 'Opening the jar...' : `You have ${this.props.data.cookies} 🍪`}</h1>
        <Cookie refetchJar={this.props.data.refetch} />
      </div>)

  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Jar />
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