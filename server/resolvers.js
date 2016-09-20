import { Cookies } from './collections.js';

const resolvers = {
  Query: {
    cookies() {
      return Cookies.find({}).count();
    },
  },
  Mutation: {
    addCookie(_, {}, context) {
      Cookies.insert({});
      return Cookies.find({}).count();
    },
  },
};

export default resolvers;