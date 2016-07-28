const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
} = require('graphql');

const humps = require('humps');

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
      resolve: (obj, args, { pool }) => {
        return pool.query(`
          select * from spouses
          where id = 1
        `, [])
          .then(result => humps.camelizeKeys(result.rows[0]))
      }
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
});

module.exports = mySchema;
