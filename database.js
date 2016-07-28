const humps = require('humps');

module.exports = (pool) => ({
  getUsersByIds(userIDs) {
    return pool.query(`
      select id, first_name, last_name, email, spouse_id, 'Person' as type
      from spouses where id = ANY($1)
    `, [userIDs])
      .then(result => humps.camelizeKeys(result.rows));
  },
  getAllUsers() {
    return pool.query(`select * from spouses`, [])
      .then(result => humps.camelizeKeys(result.rows));
  }
});
