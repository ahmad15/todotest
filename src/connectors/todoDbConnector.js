const util = require('util');
const moment = require('moment');
const { v4 } = require('uuid');

const { throwIfMissing } = require('../helpers/throwIf');
const STATUS = require('../constants/status');

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
   * @param {object} params - parameters
   * @param {string} params.status - filter by status delimeter by comma
   * @param {string} params.sort - sorting
   * @param {string} params.content - content filter
   * @returns {object} - return list data todo
   */
  async getListTodo(params) {
    const { status, sort, content, deadlineFrom, deadlineTo } = params;
    let list;
    const sorting = sort || 'asc';
    const splitStatus = status ? status.split(',') : [];

    let filterStatus = content ? `AND (title ILIKE '%${content}%' OR description ILIKE '%${content}%')` : '';
    filterStatus += deadlineFrom ? ` AND deadline >= '${moment(deadlineFrom).format('YYYY-MM-DD')}'` : '';
    filterStatus += deadlineTo ? ` AND deadline <= '${moment(deadlineTo).format('YYYY-MM-DD')}'` : '';

    if (splitStatus.length > 0) {
      let statusJoin = splitStatus.map(status => `'${status}'`);
      const isDone = splitStatus.includes(STATUS.DONE);

      if (isDone) {
        statusJoin = statusJoin.filter(status => status !== `'${STATUS.DONE}'`);
      }

      if (statusJoin.length > 0) {
        filterStatus = `AND status IN (${statusJoin.join(',')})`;
      }

      if (isDone && statusJoin.length > 0) {
        filterStatus = `${filterStatus} OR done = true`;
      } else if (isDone && statusJoin.length === 0) {
        filterStatus = `AND done = true`;
      } else {
        filterStatus = `${filterStatus} AND done = false`;
      }
    }

    try {
      const query = util.promisify(this.db.query).bind(this.db);
      list = await query(`SELECT
          td.*,
          ti.filename as snapshot,
          ti.filepath as snapshotpath
        FROM ${this.table} td
        LEFT JOIN todoimages ti ON ti.todoid = td.id
        WHERE 1=1 ${filterStatus}
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
        (id, title, description, deadline, status, created) VALUES ($1, $2, $3, $4, $5, $6)`,
        [todoid, payload.title, payload.description, payload.deadline, payload.status, now]);
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
        SET title = $1, description = $2, deadline = $3, status = $4, done = $5, updated = $6 WHERE id = $7`,
        [payload.title, payload.description, payload.deadline, payload.status, payload.done, now, id]);
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
