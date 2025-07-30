const util = require('util');
const moment = require('moment');
const { v4 } = require('uuid');

const { throwIfMissing } = require('../helpers/throwIf');
const { isEmptyString } = require('../helpers/conditionals');

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

    this.table = 'todos';
  }

  /**
   * get list Todo data
   * @param {string} sort - sort by deadline
   * @returns {object} - return list data todo
   */
  async getListTodo(sort) {
    let list;
    const sorting = isEmptyString(sort) ? 'desc' : sort;

    try {
      const query = util.promisify(this.db.query).bind(this.db);
      list = await query(`SELECT
          td.*,
          ti.filename as snapshot,
          ti.filepath as snapshotpath
        FROM ${this.table} td
        LEFT JOIN todoimages ti ON ti.todoid = td.id
        ORDER BY deadline ${sorting}`);
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
      detail = await query(`SELECT
          td.*,
          ti.filename as snapshot,
          ti.filepath as snapshotpath
        FROM ${this.table} td
        LEFT JOIN todoimages ti ON ti.todoid = td.id
        WHERE td.id = '${id}'`);
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
    const now = moment().toDate();
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      insert = await query(`INSERT INTO ${this.table}
        (id, title, description, deadline, created) VALUES ($1, $2, $3, $4, $5)`,
        [todoid, payload.title, payload.description, payload.deadline, now]);
    } catch (error) {
      this.logger.error(`Error insert Todo data ${error}`);
    }
    return {...insert, todoid };
  }

  /**
   * insert Todo image data
   * @param {object} payload - payload data
   */
  async insertTodoImage(payload) {
    let insert;
    const todoimageid = v4();

    try {
      const query = util.promisify(this.db.query).bind(this.db);
      insert = await query(`INSERT INTO todoimages
        (id, filename, filepath, mimetype, size, todoid) VALUES ($1, $2, $3, $4, $5, $6)`,
        [todoimageid, payload.filename, payload.filepath, payload.mimetype, payload.size, payload.todoid]);
    } catch (error) {
      this.logger.error(`Error insert Todo image data ${error}`);
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
      update = await query(`UPDATE ${this.table}
        SET title = $1, description = $2, deadline = $3, done = $4, updated = $5 WHERE id = $6`,
        [payload.title, payload.description, payload.deadline, payload.done, now, id]);
    } catch (error) {
      this.logger.error(`Error update Todo data ${error}`);
    }
    return update;
  }

  /**
   * update Todo Image data
   * @param {object} payload - payload data
   */
  async updateTodoImage(id, payload) {
    let update;
    const now = moment().toDate();
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      update = await query(`UPDATE todoimages
        SET filename = $1, filepath = $2, mimetype = $3, size = $4 WHERE todoid = $5`,
        [payload.filename, payload.filepath, payload.mimetype, payload.size, id]);
    } catch (error) {
      this.logger.error(`Error update Todo image data ${error}`);
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
      remove = await query(`DELETE FROM ${this.table} WHERE id = '${id}'`);
    } catch (error) {
      this.logger.error(`Error update Todo data ${error}`);
    }
    return remove;
  }


  /**
   * delete Todo Image data
   * @param {object} id - id data
   */
  async deleteTodoImage(id) {
    let remove;
    try {
      const query = util.promisify(this.db.query).bind(this.db);
      remove = await query(`DELETE FROM todoimages WHERE todoid = '${id}'`);
    } catch (error) {
      this.logger.error(`Error update Todo Image data ${error}`);
    }
    return remove;
  }
}

module.exports = TodoDbConnector;
