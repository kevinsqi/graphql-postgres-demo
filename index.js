const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');

const pg = require('pg');
const config = {
  database: 'forward'
};
const pool = new pg.Pool(config);
pool.query(`
  select * from spouses
`, [])
  .then(result => console.log(result.rows));

const express = require('express');
const app = express();

const mySchema = require('./schema');

app.get('/', (req, res) => {
  res.send('hello express');
});

app.use('/graphql', graphqlHTTP({ schema: mySchema, graphiql: true }));

app.listen(3000, () => {
  console.log('express is running...');
});
