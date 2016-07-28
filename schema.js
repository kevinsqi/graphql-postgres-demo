const db = require('./database');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const {
  nodeDefinitions,
  globalIdField,
  fromGlobalId,
} = require('graphql-relay');

var { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, { loaders }) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'Person') {
      return loaders.usersByIds.load(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj.type === 'Person') {
      return personType;
    } else {
      return null;
    }
  }
);

const personType = new GraphQLObjectType({
  name: 'Person',
  interfaces: [nodeInterface],
  fields: () => {  // use a thunk because it's self-referential (actually, always use a thunk)
    return {
      id: globalIdField('Person'),
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
          return db(pool).getUserById(obj.spouseId);
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
    node: nodeField,
    people: {
      type: new GraphQLList(personType),
      resolve: (obj, args, { pool }) => {
        return db(pool).getAllUsers();
      }
    },
		person: {
      type: personType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (obj, args, { loaders }) => {
        console.log(args);
        return loaders.usersByIds.load(args.id);
      }
    }
  }
});

const mySchema = new GraphQLSchema({
  query: queryType,
});

module.exports = mySchema;
