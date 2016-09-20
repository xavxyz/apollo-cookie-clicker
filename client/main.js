import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import { graphql, ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import update from 'react-addons-update';

const client = new ApolloClient();

class Cookie extends Component {
  render() {
    return (
      <div className="Cookie" onClick={ () => { this.props.addOne(); } }>
        <img src="/cookie.png" />
      </div>
    );
  }
}

const CookiesCount = ({ loading, cookies }) => {
  return (
    <h1>{ loading ? 'Opening the jar...' : `You have ${ cookies } 🍪` }</h1>
  );
};

// this is hell-over-engineered ⚗
@graphql(gql`
  mutation addCookie {
    addCookie
  }
`, {
  props({ ownProps, mutate }) {
    return {
      addOne() {
        const prevCount = client.store.getState().apollo.data.ROOT_QUERY.cookies; // lol
        return mutate({
          variables: {},
          optimisticResponse: {
            __typename: 'Mutation',
            addCookie: prevCount + 1,
          },
          updateQueries: {
            getCookies: (prev, { mutationResult }) => {
              const newCount = mutationResult.data.addCookie;
              return update(prev, {
                cookies: { $set: newCount }
              });
            },
          },
        });
      },
    };
  },
})
@graphql(gql`
  query getCookies {
    cookies
  }
`)
class Jar extends Component {
  render() {
    const { loading, cookies } = this.props.data;
    return (
      <div className="App">
        <CookiesCount loading={ loading } cookies={ cookies } />
        <Cookie addOne={ this.props.addOne } />
      </div>
    );
  }
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <Jar />
  </ApolloProvider>,
  document.getElementById('root')
);