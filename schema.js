const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const humps = require('humps');

const personType = new GraphQLObjectType({
  name: 'Person',
  fields: () => {  // use a thunk because it's self-referential (actually, always use a thunk)
    return {
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
      spouse: {
        type: personType,
        resolve: (obj, args, { pool }) => {
          return pool.query(`
            select * from spouses
            where id = $1
          `, [obj.spouseId])
            .then(result => humps.camelizeKeys(result.rows[0]))
        },
      },
      fullName: {
        type: GraphQLString,
        resolve: (obj) => `${obj.firstName} ${obj.lastName}`
      }
    };
  }
});

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
		person: {
      type: personType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (obj, args, { pool }) => {
        return pool.query(`
          select * from spouses
          where id = $1
        `, [args.id])
          .then(result => humps.camelizeKeys(result.rows[0]))
      }
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
});

module.exports = mySchema;
