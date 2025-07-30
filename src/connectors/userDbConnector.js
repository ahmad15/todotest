const { throwIfMissing } = require('../helpers/throwIf');
const util = require('util');
const moment = require('moment');
const { v4 } = require('uuid');

/**
 * User Model - class
 */
class UserDbConnector {
  /**
   * constructor
   * @param {object} opts - options object
   */
  constructor(opts) {
    Object.assign(this, opts);
    throwIfMissing(this.logger, 'must supply opts.logger');
    throwIfMissing(this.db, 'must supply opts.db');

    this.table = 'users';
  }

  /**
   * get list User data
   * @returns {object} - return list data User
   */
  async getListUser() {
    let list;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      list = await query(`SELECT * FROM ${this.table} ORDER BY updated DESC`);
    } catch (error) {
      this.logger.error(`Error get list User data ${error}`);
    }
    return list;
  }

  /**
   * get Detail User data
   * @param {string} id - User id
   * @returns {object} - return data searched
   */
  async getDetailUser(id) {
    let detail;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      detail = await query(`SELECT * FROM ${this.table} WHERE id = '${id}'`);
    } catch (error) {
      this.logger.error(`Error get detail User data ${error}`);
    }
    return detail;
  }

  /**
   * get Auth User data
   * @param {string} email - User email
   * @returns {object} - return data searched
   */
  async getAuthUser(email) {
    let detail;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      detail = await query(`SELECT * FROM ${this.table} WHERE email = '${email}'`);
    } catch (error) {
      this.logger.error(`Error get Auth User data ${error}`);
    }
    return detail;
  }

  /**
   * insert User data
   * @param {object} payload - payload data
   */
  async insertUser(payload) {
    let insert;
    const Userid = v4();
    const now = moment().toDate();
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      insert = await query(`INSERT INTO ${this.table}
        (id, email, password, name, created) VALUES ($1, $2, $3, $4, $5)`,
        [Userid, payload.email, payload.password, payload.name, now]);
    } catch (error) {
      this.logger.error(`Error insert User data ${error}`);
    }
    return insert;
  }

  /**
   * update User data
   * @param {object} payload - payload data
   */
  async updateUser(id, payload) {
    let update;
    const now = moment().toDate();
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      update = await query(`UPDATE ${this.table}
        SET email = $1, password = $2, name = $3, updated = $4 WHERE id = $5`,
        [payload.email, payload.password, payload.name, now, id]);
    } catch (error) {
      this.logger.error(`Error update User data ${error}`);
    }
    return update;
  }

  /**
   * delete User data
   * @param {object} id - id data
   */
  async deleteUser(id) {
    let remove;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      remove = await query(`DELETE FROM ${this.table} WHERE id = '${id}'`);
    } catch (error) {
      this.logger.error(`Error update User data ${error}`);
    }
    return remove;
  }
}

module.exports = UserDbConnector;
