const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const humps = require('humps');

const person = humps.camelizeKeys({
	id: 1,
	first_name: 'kevin',
	last_name: 'qi',
	email: 'test123@example.com',
	spouse_id: 2
});

const personType = new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: {
      type: GraphQLID
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    spouseId: {
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
