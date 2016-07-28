const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require('graphql');

let counter = 42;
let counters = [42, 43];
let counterObj = {
  id: 55,
  value: 42
};
let countersObj = [
  {
    id: 55,
    value: 42
  },
  {
    id: 56,
    value: 43
  }
];

const counterObjType = new GraphQLObjectType({
  name: 'CounterObj',
  fields: {
    id: { type: GraphQLID },
    value: { type: GraphQLInt }
  }
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {  // what fields are supported on the type
    hello: {
      type: GraphQLString,
      resolve: () => "world"
    },
    counter: {
      type: GraphQLInt,
      resolve: () => counter++
    },
    counters: {
      type: new GraphQLList(GraphQLInt),
      resolve: () => counters
    },
    counterObj: {
      type: counterObjType,
      resolve: () => counterObj
    },
    countersObj: {
      type: new GraphQLList(counterObjType),
      resolve: () => countersObj
    }
  }
});

const mutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    incrementCounter: {
      type: GraphQLInt,
      resolve: () => ++counter
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
});

module.exports = mySchema;
