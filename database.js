const humps = require('humps');

module.exports = (pool) => ({
  getUserById(userID) {
    return pool.query(`
      select * from spouses where id = $1
    `, [userID])
      .then(result => humps.camelizeKeys(result.rows[0]));
  },
  getAllUsers() {
    return pool.query(`
      select * from spouses
    `, [])
      .then(result => humps.camelizeKeys(result.rows));
  }
});
