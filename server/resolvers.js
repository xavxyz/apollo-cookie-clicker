import { Cookies } from './collections.js';

const resolvers = {
  Query: {
    cookies() {
      return Cookies.find({}).count();
    },
  },
  Mutation: {
    addCookie(_, {}, context) {
      return Cookies.insert({});
    },
  },
};

export default resolvers;