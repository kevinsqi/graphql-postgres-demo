// dataloader
const DataLoader = require('dataloader');
const db = require('./database');

// graphql
const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const mySchema = require('./schema');

// postgres
const pg = require('pg');
const config = {
  database: 'forward'
};
const pool = new pg.Pool(config);
pool.query(`
  select * from spouses
`, [])
  .then(result => console.log(result.rows));

// express
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/graphql', (req, res) => {
  const loaders = {
    usersByIds: new DataLoader(db(pool).getUsersByIds)
  };

  graphqlHTTP({
    schema: mySchema,
    graphiql: true,
    context: {
      pool,
      loaders,
    }
  })(req, res);
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('express is running...');
});
