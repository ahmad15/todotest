const moment = require('moment');
const { throwIfMissing } = require('../helpers/throwIf');
const CustomError = require('../helpers/customError');

/**
 * Wallet Todo Model class
 */
class Todo {
  /**
   * constructors
   * @param {object} opts -
   */
  constructor(opts) {
    Object.assign(this, opts);
    throwIfMissing(
      this.todoDbConnector,
      'must supply opts.todoDbConnector'
    );
  }

  /**
   * getTodo
   *
   * @returns {object} object result
   * if update additional info is success
   *
   */
  async getListTodo() {
    const todos = await this.todoDbConnector.getListTodo();
    if (todos.rows.length > 0) {
      return todos.rows;
    }
    throw new CustomError('No Todo found', 'DATA_NOT_FOUND', 404);
  }

  /**
   * getDetailTodo
   *
   * @param {string} string id
   * @returns {object} object result
   * if update additional info is success
   *
   */
  async getDetailTodo(id) {
    const todos = await this.todoDbConnector.getDetailTodo(id);
    if (todos.rows.length > 0) {
      return todos.rows[0];
    }
    throw new CustomError('No Todo found', 'DATA_NOT_FOUND', 404);
  }

  /**
   * insertTodo
   *
   * @param {payload} object payload
   * @returns {object} object result
   *
   */
  async insertTodo(payload) {
    const todos = await this.todoDbConnector.insertTodo(payload);
    if (todos.rowCount > 0) {
      return new CustomError('Successfuly insert todo data', 'SUCCESS', 200);
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

  /**
   * updateTodo
   *
   * @param {string} string id
   * @param {payload} object payload
   * @returns {object} object result
   *
   */
  async updateTodo(id, payload) {
    const todos = await this.todoDbConnector.updateTodo(id, payload);
    if (todos.rowCount > 0) {
      return new CustomError('Successfuly update todo data', 'SUCCESS', 200);
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

  /**
   * deleteTodo
   *
   * @param {string} string id
   * @returns {object} object result
   *
   */
  async deleteTodo(id) {
    const todos = await this.todoDbConnector.deleteTodo(id);
    if (todos) {
      return new CustomError('Successfuly remove todo data', 'SUCCESS', 200);
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

}

module.exports = Todo;
