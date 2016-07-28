const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const person = {
	id: 1,
	first_name: 'kevin',
	last_name: 'qi',
	email: 'test123@example.com',
	spouse_id: 2
};

const personType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString,
      resolve: (obj) => obj.first_name
    },
    last_name: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    spouse_id: {
      type: GraphQLInt
    },
  }
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
		person: {
      type: personType,
      resolve: () => person
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
});

module.exports = mySchema;
