const humps = require('humps');

module.exports = (pool) => ({
  getUsersByIds(userIDs) {
    return pool.query(`
      select * from spouses where id IN ($1)
    `, [userIDs])
      .then(result => humps.camelizeKeys(result.rows[0]));
  }
});
