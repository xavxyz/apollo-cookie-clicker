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

const CookiesCount = ({ loading, cookies }) => (
  <h1>{ loading ? 'Opening the jar...' : `You have ${ cookies } 🍪` }</h1>
);

@graphql(gql`
  query getCookies {
    cookies
  }
`)
class Jar extends Component {
  render() {
    const { refetch, loading, cookies } = this.props.data;
    return (
      <div className="App">
        <CookiesCount loading={ loading } cookies={ cookies } />
        <Cookie refetchJar={ refetch } />
      </div>
    );
  }
}

// const CookieJar = graphql(gql`
//   query getCookies {
//     cookies
//   }
// `)(App);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Jar />
  </ApolloProvider>,
  document.getElementById('root')
);