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
   * @param {string} sort - sorting
   * @returns {object} object result
   * if update additional info is success
   *
   */
  async getListTodo(sort) {
    const todos = await this.todoDbConnector.getListTodo(sort);
    if (todos.rows.length > 0) {
      return todos.rows.map((row) => {
        return {
          id: row.todoid,
          ...row,
          deadline: moment(row.deadline).format('YYYY-MM-DD')};
      });
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
      const todo = todos.rows[0];
      return {
        ...todo,
        id: todo.todoid,
        deadline: moment(todo.deadline).format('YYYY-MM-DD')
      };
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
    const todo = await this.todoDbConnector.insertTodo(payload);
    if (todo.rowCount > 0) {
      await this.todoDbConnector.insertTodoImage({...payload, todoid: todo.todoid});
      return {
        code: 'SUCCESS',
        message: 'Successfuly insert todo data'
      };
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
      if(payload.filename !== undefined) {
        await this.todoDbConnector.updateTodoImage(id, payload);
      }

      return {
        code: 'SUCCESS',
        message: 'Successfuly update todo data'
      };
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
      await this.todoDbConnector.deleteTodoImage(id);

      return {
        code: 'SUCCESS',
        message: 'Successfuly remove todo data'
      };
    }
    throw new CustomError('Something error', 'INTERNAL_SERVER_ERROR', 500);
  }

}

module.exports = Todo;
