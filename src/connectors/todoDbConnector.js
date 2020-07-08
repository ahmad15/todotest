const { throwIfMissing } = require('../helpers/throwIf');
const util = require('util');
const moment = require('moment');
const { v4 } = require('uuid');

/**
 * Todo Model - class
 */
class TodoDbConnector {
  /**
   * constructor
   * @param {object} opts - options object
   */
  constructor(opts) {
    Object.assign(this, opts);
    throwIfMissing(this.logger, 'must supply opts.logger');
    throwIfMissing(this.db, 'must supply opts.db');

    this.table = 'todo';
  }

  /**
   * get list Todo data
   * @returns {object} - return list data todo
   */
  async getListTodo() {
    let list;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      list = await query(`SELECT * FROM ${this.table} ORDER BY todo_title ASC`);
    } catch (error) {
      this.logger.error(`Error get list Todo data ${error}`);
    }
    return list;
  }

  /**
   * get Detail Todo data
   * @param {string} id - todo id
   * @returns {object} - return data searched
   */
  async getDetailTodo(id) {
    let detail;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      detail = await query(`SELECT * FROM ${this.table} WHERE todo_id = '${id}'`);
    } catch (error) {
      this.logger.error(`Error get detail Todo data ${error}`);
    }
    return detail;
  }

  /**
   * insert Todo data
   * @param {object} payload - payload data
   */
  async insertTodo(payload) {
    let insert;
    const todoid = v4();
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      insert = await query(`INSERT INTO ${this.table}
        (todo_id, todo_title, todo_content) VALUES ($1, $2, $3)`, [todoid, payload.title, payload.content]);
    } catch (error) {
      this.logger.error(`Error insert Todo data ${error}`);
    }
    return insert;
  }

  /**
   * update Todo data
   * @param {object} payload - payload data
   */
  async updateTodo(id, payload) {
    let update;
    const now = moment().toDate();
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      update = await query(`UPDATE ${this.table} SET todo_title = $1, todo_content = $2, todo_done = $3, todo_updated = $4 WHERE todo_id = $5`, [payload.title, payload.content, payload.done, now, id]);
    } catch (error) {
      this.logger.error(`Error update Todo data ${error}`);
    }
    return update;
  }

  /**
   * delete Todo data
   * @param {object} id - id data
   */
  async deleteTodo(id) {
    let remove;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      remove = await query(`DELETE FROM ${this.table} WHERE todo_id = '${id}'`);
    } catch (error) {
      this.logger.error(`Error update Todo data ${error}`);
    }
    return remove;
  }
}

module.exports = TodoDbConnector;
