import { Mongo } from 'meteor/mongo';

const Cookies = new Mongo.Collection('cookies');

export { Cookies };